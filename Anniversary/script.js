console.log("JS is linked 🎯");
const circle3 = document.getElementById("circle3");
const circle = document.getElementById("circle");
const container = document.getElementById("container");

const fade = () => {

  circle.classList.add("hidden");


  circle3.classList.remove("hidden");

  container.classList.remove("hidden");
};

circle.addEventListener("click", fade);
