vlc.exe -R rtsp://admin:admin@192.168.1.2:1935 --sout  "#transcode{vcodec=mjpg,vb=2500,scale=1.0,fps=10,acodec=none}:standard{access=http{mime=multipart/x-mixed-replace; boundary=7b3cc56e5f51db803f790dad720ed50a},mux=mpjpeg,dst=:8888/videostream.cgi}

rtsp://admin:admin@192.168.1.2:1935

http://localhost:8888/videostream.cgi

embed todo