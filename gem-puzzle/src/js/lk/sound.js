function playSound() {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = "../../assets/img/1.mp3";
  audio.play();
}

export default playSound;