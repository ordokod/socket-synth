const socket = io();
const video = document.getElementById("video");

socket.on("tick700", (frame) => {
  console.log("play", frame);

  video.currentTime = 0;
  video.play();
});
