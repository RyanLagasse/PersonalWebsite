const bookPassage = "This is the book passage that will be typed out on the screen.";

const passageDisplay = document.querySelector("#passage-display");

let index = 0;

function typePassage() {
  passageDisplay.textContent += bookPassage[index];
  index++;
  if (index === bookPassage.length) {
    clearInterval(intervalId);
  }
}

let intervalId;

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    intervalId = setInterval(typePassage, 50);
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    clearInterval(intervalId);
  }
});