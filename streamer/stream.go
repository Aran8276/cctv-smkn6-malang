// stream.go

package main

import (
	"errors"
	"log"
	"runtime/debug" // Import the debug package to print stack traces
	"time"

	"github.com/deepch/vdk/format/rtspv2"
)

var (
	ErrorStreamExitNoVideoOnStream = errors.New("Stream Exit No Video On Stream")
	ErrorStreamExitRtspDisconnect  = errors.New("Stream Exit Rtsp Disconnect")
	ErrorStreamExitNoViewer        = errors.New("Stream Exit On Demand No Viewer")
)

func serveStreams() {
	for k, v := range Config.Streams {
		// Initialize the stop channel for streams defined in config.json
		v.stop = make(chan struct{})
		Config.Streams[k] = v
		if !v.OnDemand {
			go RTSPWorkerLoop(k, v.URL, v.OnDemand, v.DisableAudio, v.Debug, v.stop)
		}
	}
}

func RTSPWorkerLoop(name, url string, OnDemand, DisableAudio, Debug bool, stop chan struct{}) {
	// This defer will run when the entire loop exits, ensuring the lock is released.
	defer Config.RunUnlock(name)

	for {
		// We run the worker in an anonymous function that can recover from panics.
		func() {
			// This defer will catch panics from the RTSPWorker call.
			defer func() {
				if r := recover(); r != nil {
					log.Printf("PANIC! Recovered in worker for stream '%s'. Error: %v", name, r)
					log.Printf("Stack: %s", string(debug.Stack())) // Log the stack trace
				}
			}()

			log.Println("Stream Try Connect", name)
			err := RTSPWorker(name, url, OnDemand, DisableAudio, Debug, stop)
			// A panic will be recovered above, and this part will be skipped.
			// A normal error will be handled here.
			if err != nil {
				log.Println(name, err)
				Config.LastError = err
			}
		}() // End of the anonymous, panic-recovering function call.

		// The original logic for stopping or continuing the loop.
		select {
		case <-stop:
			log.Println("Stream", name, "stopped via API.")
			return
		default:
		}

		if OnDemand && !Config.HasViewer(name) {
			log.Println(ErrorStreamExitNoViewer)
			return
		}

		select {
		case <-stop:
			log.Println("Stream", name, "stopped via API.")
			return
		case <-time.After(1 * time.Second):
			// Loop will continue to the next iteration to retry connecting.
		}
	}
}

// No changes needed in RTSPWorker, the recovery is handled in the calling loop.
func RTSPWorker(name, url string, OnDemand, DisableAudio, Debug bool, stop chan struct{}) error {
	keyTest := time.NewTimer(20 * time.Second)
	clientTest := time.NewTimer(20 * time.Second)
	//add next TimeOut
	RTSPClient, err := rtspv2.Dial(rtspv2.RTSPClientOptions{URL: url, DisableAudio: DisableAudio, DialTimeout: 3 * time.Second, ReadWriteTimeout: 3 * time.Second, Debug: Debug})
	if err != nil {
		return err
	}
	defer RTSPClient.Close()
	if RTSPClient.CodecData != nil {
		Config.coAd(name, RTSPClient.CodecData)
	}
	var AudioOnly bool
	if len(RTSPClient.CodecData) == 1 && RTSPClient.CodecData[0].Type().IsAudio() {
		AudioOnly = true
	}
	for {
		select {
		case <-stop:
			return errors.New("stream stopped via API")
		case <-clientTest.C:
			if OnDemand {
				if !Config.HasViewer(name) {
					return ErrorStreamExitNoViewer
				} else {
					clientTest.Reset(20 * time.Second)
				}
			}
		case <-keyTest.C:
			return ErrorStreamExitNoVideoOnStream
		case signals := <-RTSPClient.Signals:
			switch signals {
			case rtspv2.SignalCodecUpdate:
				Config.coAd(name, RTSPClient.CodecData)
			case rtspv2.SignalStreamRTPStop:
				return ErrorStreamExitRtspDisconnect
			}
		case packetAV := <-RTSPClient.OutgoingPacketQueue:
			if AudioOnly || packetAV.IsKeyFrame {
				keyTest.Reset(20 * time.Second)
			}
			Config.cast(name, *packetAV)
		}
	}
}
