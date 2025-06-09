package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	go serveHTTP()
	go serveStreams()
	sigs := make(chan os.Signal, 1)
	done := make(chan bool, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		sig := <-sigs
		log.Println(sig)
		done <- true
	}()
	log.Println("Server Start Awaiting Signal")
	<-done
	log.Println("Exiting")
}

// main.go
// package main

// import (
// 	"log"
// 	"os"
// 	"os/signal"
// 	"syscall"
// )

// func main() {
// 	// Create the directory for thumbnails if it doesn't exist.
// 	if err := os.MkdirAll("./thumbnails", 0755); err != nil {
// 		log.Fatalf("Failed to create thumbnail directory: %v", err)
// 	}

// 	go serveHTTP()
// 	go serveStreams()

// 	sigs := make(chan os.Signal, 1)
// 	done := make(chan bool, 1)
// 	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
// 	go func() {
// 		sig := <-sigs
// 		log.Println(sig)
// 		done <- true
// 	}()

// 	log.Println("Server Start Awaiting Signal")
// 	<-done
// 	log.Println("Exiting")
// }
