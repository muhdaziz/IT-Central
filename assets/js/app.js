const body = document.body;
const scrolled_nav = document.querySelector(".header_container");
// const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const toggle = document.getElementById("toggler");
const mode = document.getElementById("mode");
const nav_links = document.querySelector(".nav_links");
const popup = document.getElementById("popup");

window.onscroll = () => {
  toggle.classList.remove("toggle");
  nav_links.classList.remove("active");
  if (body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrolled_nav.classList.add("scrolled");
  } else {
    scrolled_nav.classList.remove("scrolled");
  }
};

toggle.addEventListener("click", () => {
  toggle.classList.toggle("toggle");
  nav_links.classList.toggle("active");
});

mode.addEventListener("click", () => {
  body.classList.toggle("dark");
  popup.classList.add("active");
  if (body.classList.contains("dark")) {
    mode.innerHTML = `<img src="./assets/img/sun.png" />`;
    popup.innerHTML = `<p>Dark mode on</p>`;
  } else {
    mode.innerHTML = `<img src="./assets/img/moon.png" />`;
    popup.innerHTML = `<p>Light mode on</p>`;
  }

  setTimeout(() => {
    popup.classList.remove("active");
  }, 900);
});

// const detectDarkMode = () => {
//   if (darkModeQuery.matches) {
//     console.log("System on DARK MODE");
//     mode.innerHTML = `<img src="./assets/img/sun.png" />`;
//     body.classList.add("dark");
//   } else {
//     console.log("System on LIGHT MODE");
//     mode.innerHTML = `<img src="./assets/img/moon.png" />`;
//     body.classList.remove("dark");
//   }
// };

// detectDarkMode();
// darkModeQuery.addEventListener("change", (e) => detectDarkMode(e));

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

const slideImage = document.querySelectorAll(".slide-image");
const slidesContainer = document.querySelector(".slides-container");
const nextBtn = document.getElementById("right-arrow");
const prevBtn = document.getElementById("left-arrow");
const navigationDots = document.querySelector(".navigation-dots");

let numberOfImages = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;

// Set up the slider
function init() {
  slideImage.forEach((img, i) => {
    img.style.left = i * 100 + "%";
  });

  slideImage[0].classList.add("active");

  createNavigationDots();
}

init();

// Create navigation dots
function createNavigationDots() {
  for (let i = 0; i < numberOfImages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("single-dot");
    navigationDots.appendChild(dot);

    dot.addEventListener("click", () => {
      goToSlide(i);
    });
  }

  navigationDots.children[0].classList.add("active");
}

// Next Button
nextBtn.addEventListener("click", () => {
  if (currentSlide >= numberOfImages - 1) {
    goToSlide(0);
    return;
  }

  currentSlide++;
  goToSlide(currentSlide);
});

// Previous Button
prevBtn.addEventListener("click", () => {
  if (currentSlide <= 0) {
    goToSlide(numberOfImages - 1);
    return;
  }

  currentSlide--;
  goToSlide(currentSlide);
});

setInterval(() => {
  if (currentSlide >= numberOfImages - 1) {
    goToSlide(0);
    return;
  }

  currentSlide++;
  goToSlide(currentSlide);
}, 5000);

// Go To Slide
function goToSlide(slideNumber) {
  slidesContainer.style.transform =
    "translateX(-" + slideWidth * slideNumber + "px)";

  currentSlide = slideNumber;

  setActiveClass();
}

// Set Active Class
function setActiveClass() {
  // Set active class for Slide Image

  let currentActive = document.querySelector(".slide-image.active");
  currentActive.classList.remove("active");
  slideImage[currentSlide].classList.add("active");

  // Set active class for navigation dots
  let currentDot = document.querySelector(".single-dot.active");
  currentDot.classList.remove("active");
  navigationDots.children[currentSlide].classList.add("active");
}

window.onresize = function () {
  slideWidth = slideImage[0].clientWidth;
  slidesContainer.style.transform = `translateX(-${
    slideWidth * currentSlide
  }px)`;
};
