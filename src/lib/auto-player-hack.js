const autoPlayerHack = (audios) => {
  for (let a = 0; a < audios.length; a += 1) {
    const audio = audios[a];
    audio.volume = 0;
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 500);
  }
};

export default autoPlayerHack;
