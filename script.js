function playJingle() {
  var audio = document.getElementById("jingleAudio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
