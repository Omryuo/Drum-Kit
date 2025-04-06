// Initialize audio files
const audioFiles = {
  "w": new Audio("./sounds/tom-1.mp3"),
  "a": new Audio("./sounds/tom-2.mp3"),
  "s": new Audio("./sounds/tom-3.mp3"),
  "d": new Audio("./sounds/tom-4.mp3"),
  "j": new Audio("./sounds/snare.mp3"),
  "k": new Audio("./sounds/crash.mp3"),
  "l": new Audio("./sounds/kick-bass.mp3")
};

// Track loading status
let soundsLoaded = false;
const loadingElement = document.getElementById('loading');

// Wait for all sounds to be loaded
Promise.all(
  Object.values(audioFiles).map(audio => {
    return new Promise(resolve => {
      if (audio.readyState >= 3) {
        resolve();
      } else {
        audio.addEventListener('canplaythrough', resolve, {once: true});
      }
    });
  })
).then(() => {
  soundsLoaded = true;
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
}).catch(error => {
  console.error("Error loading audio files:", error);
  if (loadingElement) {
    loadingElement.textContent = "Some sounds may not be available";
  }
});

// Event delegation for button clicks
document.querySelector(".set").addEventListener("click", function(event) {
  if (event.target.classList.contains("drum")) {
    const buttonKey = event.target.innerHTML;
    makeSound(buttonKey);
    buttonAnimation(buttonKey);
  }
});

// Keyboard press handler
document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

/**
 * Plays the sound associated with the given key
 * @param {string} key - The key to play sound for
 */
function makeSound(key) {
  try {
    if (audioFiles[key]) {
      // Reset audio position and play
      audioFiles[key].currentTime = 0;
      audioFiles[key].play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  } catch (error) {
    console.error("Error in makeSound:", error);
  }
}

/**
 * Creates a button press animation effect
 * @param {string} currentKey - The key that was pressed
 */
function buttonAnimation(currentKey) {
  try {
    const activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
      activeButton.classList.add("pressed");
      
      // Remove the animation class after a delay
      setTimeout(function() {
        activeButton.classList.remove("pressed");
      }, 150);
    }
  } catch (error) {
    console.error("Error in buttonAnimation:", error);
  }
}