console.log("JS is linked 🎯");
const circle3 = document.getElementById("circle3");
const circle = document.getElementById("circle");
const container = document.getElementById("container");

const fade = () => {
  // Hide the first circle
  circle.classList.add("hidden");

  // Show the second circle by removing hidden class
  circle3.classList.remove("hidden");

  // Show the container (Valentine's Card Envelope)
  container.classList.remove("hidden");
};

circle.addEventListener("click", fade);
