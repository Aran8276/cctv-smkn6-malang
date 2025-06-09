package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sort"
	"time"

	"github.com/deepch/vdk/av"

	webrtc "github.com/deepch/vdk/format/webrtcv3"
	"github.com/gin-gonic/gin"
)

type JCodec struct {
	Type string
}

func serveHTTP() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()
	router.Use(CORSMiddleware())

	if _, err := os.Stat("./web"); !os.IsNotExist(err) {
		router.LoadHTMLGlob("web/templates/*")
		router.GET("/", HTTPAPIServerIndex)
		router.GET("/stream/player/:uuid", HTTPAPIServerStreamPlayer)
	}

	// Add the new route here
	router.POST("/stream/player/post", HTTPAPIServerStreamPost)

	router.POST("/stream/receiver/:uuid", HTTPAPIServerStreamWebRTC)
	router.GET("/stream/codec/:uuid", HTTPAPIServerStreamCodec)
	router.POST("/stream", HTTPAPIServerStreamWebRTC2)

	router.StaticFS("/static", http.Dir("web/static"))
	err := router.Run(Config.Server.HTTPPort)
	if err != nil {
		log.Fatalln("Start HTTP Server error", err)
	}
}

// func serveHTTP() {
// 	gin.SetMode(gin.ReleaseMode)

// 	router := gin.Default()
// 	router.Use(CORSMiddleware())

// 	if _, err := os.Stat("./web"); !os.IsNotExist(err) {
// 		router.LoadHTMLGlob("web/templates/*")
// 		router.GET("/", HTTPAPIServerIndex)
// 		router.GET("/stream/player/:uuid", HTTPAPIServerStreamPlayer)
// 	}

// 	// Add the new route for the POST request
// 	router.POST("/stream/player/post", HTTPAPIServerStreamPost)

// 	router.POST("/stream/receiver/:uuid", HTTPAPIServerStreamWebRTC)
// 	router.GET("/stream/codec/:uuid", HTTPAPIServerStreamCodec)
// 	router.POST("/stream", HTTPAPIServerStreamWebRTC2)

// 	// NEW: Serve static files from the ./thumbnails directory.
// 	// This makes http://.../stream/thumbnail/thumbnail.jpg work.
// 	router.StaticFS("/stream/thumbnail", http.Dir("./thumbnails"))

// 	router.StaticFS("/static", http.Dir("web/static"))
// 	err := router.Run(Config.Server.HTTPPort)
// 	if err != nil {
// 		log.Fatalln("Start HTTP Server error", err)
// 	}
// }

// Define a struct for the incoming JSON request body
// You still need this struct
type APIPostRequest struct {
	URL string `json:"url"`
}

// This is the handler for your new endpoint
func HTTPAPIServerStreamPost(c *gin.Context) {
	const streamID = "api_stream" // A fixed ID for the stream controlled by this API
	var req APIPostRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
		return
	}

	if req.URL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "URL cannot be empty"})
		return
	}

	// Use a mutex to safely modify the shared Config
	Config.mutex.Lock()

	// Check if the stream already exists and stop it
	if oldStream, ok := Config.Streams[streamID]; ok {
		if oldStream.stop != nil {
			log.Printf("Stopping existing API stream for URL: %s", oldStream.URL)
			close(oldStream.stop) // Signal the old goroutine to stop
		}
	}

	// Create a new stream configuration
	log.Printf("Creating new API stream for URL: %s", req.URL)
	Config.Streams[streamID] = StreamST{
		URL:          req.URL,
		OnDemand:     true, // OnDemand is best for this use case
		DisableAudio: false,
		Debug:        false,
		Cl:           make(map[string]viewer),
		stop:         make(chan struct{}), // Create a new stop channel
	}

	Config.mutex.Unlock()

	// Start the new stream worker. It will connect and fetch codecs.
	Config.RunIFNotRun(streamID)

	// Build the response URL
	// Note: In a production environment, you might want to configure the hostname
	// instead of relying on c.Request.Host.
	playerURL := "http://" + c.Request.Host + "/stream/player/" + streamID

	c.JSON(http.StatusOK, gin.H{
		"url": playerURL,
	})
}

// func HTTPAPIServerStreamPost(c *gin.Context) {
// 	const streamID = "api_stream"
// 	const thumbnailFile = "thumbnail.jpg"

// 	var req APIPostRequest
// 	if err := c.BindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
// 		return
// 	}
// 	if req.URL == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "URL cannot be empty"})
// 		return
// 	}

// 	Config.mutex.Lock()
// 	if oldStream, ok := Config.Streams[streamID]; ok {
// 		if oldStream.stop != nil {
// 			log.Printf("Stopping existing API stream for URL: %s", oldStream.URL)
// 			close(oldStream.stop)
// 		}
// 	}

// 	log.Printf("Creating new API stream for URL: %s", req.URL)
// 	Config.Streams[streamID] = StreamST{
// 		URL:      req.URL,
// 		OnDemand: true,
// 		Cl:       make(map[string]viewer),
// 		stop:     make(chan struct{}),
// 	}
// 	Config.mutex.Unlock()

// 	Config.RunIFNotRun(streamID)

// 	// --- NEW THUMBNAIL LOGIC ---
// 	thumbnailPath := filepath.Join("./thumbnails", thumbnailFile)

// 	// Run thumbnail generation in a goroutine so it doesn't block the HTTP response.
// 	// The user gets the URL immediately. The image will be available shortly after.
// 	go func() {
// 		// We give it a few seconds for the stream to potentially start up
// 		time.Sleep(2 * time.Second)
// 		err := generateThumbnail(req.URL, thumbnailPath)
// 		if err != nil {
// 			log.Printf("Could not generate thumbnail for %s: %v", req.URL, err)
// 		}
// 	}()
// 	// --- END NEW LOGIC ---

// 	// Build the response URLs
// 	playerURL := "http://" + c.Request.Host + "/stream/player/" + streamID
// 	imageURL := "http://" + c.Request.Host + "/stream/thumbnail/" + thumbnailFile

// 	c.JSON(http.StatusOK, gin.H{
// 		"url": playerURL,
// 		"img": imageURL,
// 	})
// }

// HTTPAPIServerIndex  index
func HTTPAPIServerIndex(c *gin.Context) {
	_, all := Config.list()
	if len(all) > 0 {
		c.Header("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store")
		c.Header("Access-Control-Allow-Origin", "*")
		c.Redirect(http.StatusMovedPermanently, "stream/player/"+all[0])
	} else {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"port":    Config.Server.HTTPPort,
			"version": time.Now().String(),
		})
	}
}

// HTTPAPIServerStreamPlayer stream player
func HTTPAPIServerStreamPlayer(c *gin.Context) {
	_, all := Config.list()
	sort.Strings(all)
	c.HTML(http.StatusOK, "player.tmpl", gin.H{
		"port":     Config.Server.HTTPPort,
		"suuid":    c.Param("uuid"),
		"suuidMap": all,
		"version":  time.Now().String(),
	})
}

// HTTPAPIServerStreamCodec stream codec
func HTTPAPIServerStreamCodec(c *gin.Context) {
	if Config.ext(c.Param("uuid")) {
		Config.RunIFNotRun(c.Param("uuid"))
		codecs := Config.coGe(c.Param("uuid"))
		if codecs == nil {
			return
		}
		var tmpCodec []JCodec
		for _, codec := range codecs {
			if codec.Type() != av.H264 && codec.Type() != av.PCM_ALAW && codec.Type() != av.PCM_MULAW && codec.Type() != av.OPUS {
				log.Println("Codec Not Supported WebRTC ignore this track", codec.Type())
				continue
			}
			if codec.Type().IsVideo() {
				tmpCodec = append(tmpCodec, JCodec{Type: "video"})
			} else {
				tmpCodec = append(tmpCodec, JCodec{Type: "audio"})
			}
		}
		b, err := json.Marshal(tmpCodec)
		if err == nil {
			_, err = c.Writer.Write(b)
			if err != nil {
				log.Println("Write Codec Info error", err)
				return
			}
		}
	}
}

// HTTPAPIServerStreamWebRTC stream video over WebRTC
func HTTPAPIServerStreamWebRTC(c *gin.Context) {
	if !Config.ext(c.PostForm("suuid")) {
		log.Println("Stream Not Found")
		return
	}
	Config.RunIFNotRun(c.PostForm("suuid"))
	codecs := Config.coGe(c.PostForm("suuid"))
	if codecs == nil {
		log.Println("Stream Codec Not Found")
		return
	}
	var AudioOnly bool
	if len(codecs) == 1 && codecs[0].Type().IsAudio() {
		AudioOnly = true
	}
	muxerWebRTC := webrtc.NewMuxer(webrtc.Options{ICEServers: Config.GetICEServers(), ICEUsername: Config.GetICEUsername(), ICECredential: Config.GetICECredential(), PortMin: Config.GetWebRTCPortMin(), PortMax: Config.GetWebRTCPortMax()})
	answer, err := muxerWebRTC.WriteHeader(codecs, c.PostForm("data"))
	if err != nil {
		log.Println("WriteHeader", err)
		return
	}
	_, err = c.Writer.Write([]byte(answer))
	if err != nil {
		log.Println("Write", err)
		return
	}
	go func() {
		cid, ch := Config.clAd(c.PostForm("suuid"))
		defer Config.clDe(c.PostForm("suuid"), cid)
		defer muxerWebRTC.Close()
		var videoStart bool
		noVideo := time.NewTimer(10 * time.Second)
		for {
			select {
			case <-noVideo.C:
				log.Println("noVideo")
				return
			case pck := <-ch:
				if pck.IsKeyFrame || AudioOnly {
					noVideo.Reset(10 * time.Second)
					videoStart = true
				}
				if !videoStart && !AudioOnly {
					continue
				}
				err = muxerWebRTC.WritePacket(pck)
				if err != nil {
					log.Println("WritePacket", err)
					return
				}
			}
		}
	}()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

type Response struct {
	Tracks []string `json:"tracks"`
	Sdp64  string   `json:"sdp64"`
}

type ResponseError struct {
	Error string `json:"error"`
}

func HTTPAPIServerStreamWebRTC2(c *gin.Context) {
	url := c.PostForm("url")
	if _, ok := Config.Streams[url]; !ok {
		Config.Streams[url] = StreamST{
			URL:      url,
			OnDemand: true,
			Cl:       make(map[string]viewer),
		}
	}

	Config.RunIFNotRun(url)

	codecs := Config.coGe(url)
	if codecs == nil {
		log.Println("Stream Codec Not Found")
		c.JSON(500, ResponseError{Error: Config.LastError.Error()})
		return
	}

	muxerWebRTC := webrtc.NewMuxer(
		webrtc.Options{
			ICEServers: Config.GetICEServers(),
			PortMin:    Config.GetWebRTCPortMin(),
			PortMax:    Config.GetWebRTCPortMax(),
		},
	)

	sdp64 := c.PostForm("sdp64")
	answer, err := muxerWebRTC.WriteHeader(codecs, sdp64)
	if err != nil {
		log.Println("Muxer WriteHeader", err)
		c.JSON(500, ResponseError{Error: err.Error()})
		return
	}

	response := Response{
		Sdp64: answer,
	}

	for _, codec := range codecs {
		if codec.Type() != av.H264 &&
			codec.Type() != av.PCM_ALAW &&
			codec.Type() != av.PCM_MULAW &&
			codec.Type() != av.OPUS {
			log.Println("Codec Not Supported WebRTC ignore this track", codec.Type())
			continue
		}
		if codec.Type().IsVideo() {
			response.Tracks = append(response.Tracks, "video")
		} else {
			response.Tracks = append(response.Tracks, "audio")
		}
	}

	c.JSON(200, response)

	AudioOnly := len(codecs) == 1 && codecs[0].Type().IsAudio()

	go func() {
		cid, ch := Config.clAd(url)
		defer Config.clDe(url, cid)
		defer muxerWebRTC.Close()
		var videoStart bool
		noVideo := time.NewTimer(10 * time.Second)
		for {
			select {
			case <-noVideo.C:
				log.Println("noVideo")
				return
			case pck := <-ch:
				if pck.IsKeyFrame || AudioOnly {
					noVideo.Reset(10 * time.Second)
					videoStart = true
				}
				if !videoStart && !AudioOnly {
					continue
				}
				err = muxerWebRTC.WritePacket(pck)
				if err != nil {
					log.Println("WritePacket", err)
					return
				}
			}
		}
	}()
}
