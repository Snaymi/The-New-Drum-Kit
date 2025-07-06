/* 🎵 Element Selection */
const buttons = document.querySelectorAll('button');
const sounds = document.querySelectorAll('audio');
const audioMap = new Map();
// Map each audio element to its corresponding data-key
sounds.forEach(sound => {
  audioMap.set(sound.dataset.key, sound);
});
/* ✨ Animation Function */
function animatePlaying(element, duration) {
  if (!element) return;
  const fastAnimTime = 0.1; // Duration of the quick animation (in seconds)
  element.classList.add('playing');
  element.classList.remove('returning');
  setTimeout(() => {
    element.classList.remove('playing');
    element.classList.add('returning');
    const slowAnimTime = Math.max(duration - fastAnimTime, 0);
    element.style.setProperty('--duration', `${slowAnimTime}s`);
    setTimeout(() => {
      element.classList.remove('returning');
      element.style.removeProperty('--duration');
    }, slowAnimTime * 1000);
  }, fastAnimTime * 1000);
}
/* 🔊 Sound Playback Function */
function playSound(key, target) {
  if (!audioMap.has(key)) return;
  const currAudio = audioMap.get(key);
  currAudio.currentTime = 0;
  currAudio.play();
  animatePlaying(target, currAudio.duration);
}
/* ⌨️ Keyboard Event Handler */
function onKeyDown(e) {
  const key = e.keyCode.toString();
  const target = document.querySelector(`button[data-key="${key}"]`);
  playSound(key, target);
}
/* 🖱️ Click Event Handler */
function onClick(e) {
  const target = e.target.closest('button');
  if (!target) return;
  const key = target.getAttribute('data-key');
  playSound(key, target);
}
/* 📌 Add Event Listeners */
if (buttons.length > 0) {
  buttons.forEach(button => {
    button.addEventListener('click', onClick);
  });
}
window.addEventListener('keydown', onKeyDown);
