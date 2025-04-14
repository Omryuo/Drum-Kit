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

let soundsLoaded = false;
const loadingElement = document.getElementById('loading');

// Wait for all sounds to be loaded
Promise.all(
  Object.values(audioFiles).map(audio => {
    return new Promise(resolve => {
      if (audio.readyState >= 3) {
        resolve();
      } else {
        audio.addEventListener('canplaythrough', resolve, { once: true });
      }
    });
  })
).then(() => {
  soundsLoaded = true;
  if (loadingElement) loadingElement.style.display = 'none';
}).catch(error => {
  console.error("Error loading audio files:", error);
  if (loadingElement) loadingElement.textContent = "Some sounds may not be available";
});

// Event delegation for button clicks
document.querySelector(".set").addEventListener("click", function(event) {
  if (event.target.classList.contains("drum")) {
    const buttonKey = event.target.innerHTML;
    playDrum(buttonKey);
  }
});

// Touch support for mobile
document.querySelectorAll(".drum").forEach(drum => {
  drum.addEventListener("touchstart", function(event) {
    const buttonKey = this.innerHTML;
    playDrum(buttonKey);
    event.preventDefault(); // Prevent ghost click
  }, { passive: false });
});

// Prevent repeat on key-hold
let activeKeys = {};
document.addEventListener("keydown", function(event) {
  if (!activeKeys[event.key]) {
    activeKeys[event.key] = true;
    playDrum(event.key);
  }
});
document.addEventListener("keyup", function(event) {
  delete activeKeys[event.key];
});

/**
 * Handles playing sound and animation for a given key
 * @param {string} key - Drum key
 */
function playDrum(key) {
  makeSound(key);
  buttonAnimation(key);
  if (navigator.vibrate) navigator.vibrate(50); // Haptic feedback on mobile
}

/**
 * Plays the sound associated with the given key
 * @param {string} key
 */
function makeSound(key) {
  try {
    if (audioFiles[key]) {
      audioFiles[key].currentTime = 0;
      audioFiles[key].play().catch(err => {
        console.error("Error playing audio:", err);
      });
    }
  } catch (error) {
    console.error("Error in makeSound:", error);
  }
}

/**
 * Animates the drum button
 * @param {string} currentKey
 */
function buttonAnimation(currentKey) {
  try {
    const activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
      activeButton.classList.add("pressed");
      setTimeout(() => {
        activeButton.classList.remove("pressed");
      }, 150);
    }
  } catch (error) {
    console.error("Error in buttonAnimation:", error);
  }
}

    }
  } catch (error) {
    console.error("Error in buttonAnimation:", error);
  }
}
