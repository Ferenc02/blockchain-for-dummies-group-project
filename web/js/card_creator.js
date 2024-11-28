/* Import card content from json file*/
import { cardContent } from "../assets/card_content.js";

let rootStyles = getComputedStyle(document.documentElement);

const cssVariables = [
  /* German Palette from flatui colors */
  "--new-boyzone",
  "--new-algal-fuel",
  "--new-fusion-red",
  "--new-nyc-taxi",
  "--new-gloomy-purple",
  "--new-blue-grey",
  "--new-orange-hibiscus",
  "--new-maximum-blue-green",
];

/* Access popular uses and innovative uses elements*/
let popularUsesElement = document.querySelector(".popular-uses-container");
let innovativeUsesElement = document.querySelector(
  ".innovative-uses-container"
);

/* Get left and right arrow buttons*/
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");

// Create cards for popular uses

let color_index = 0;
cardContent.popular_uses.forEach((card) => {
  popularUsesElement.innerHTML += `
    <div class="card" style="background-color: ${rootStyles.getPropertyValue(
      cssVariables[color_index]
    )}">
        <div class="card-title-container">
        <img src="${card.icon}" alt="icon" />
        <h2>${card.title}</h2>
        </div>
        <div class="card-content">
        <p><span>Overview:</span> ${card.overview}</p>
        <p><span>Example:</span> ${card.example}</p>
        </div>
    </div>
    `;

  color_index++;
  if (color_index >= cssVariables.length) {
    color_index = 0;
  }
});

if (cardContent.popular_uses.length > 3) {
  scrollRightButton.style.visibility = "visible";
  scrollLeftButton.style.visibility = "visible";
}

const scrollAmount =
  popularUsesElement.querySelector(".card").offsetWidth +
  parseInt(window.getComputedStyle(popularUsesElement).gap, 10);

// Scroll right
scrollRightButton.addEventListener("click", () => {
  popularUsesElement.scrollLeft += scrollAmount;
});

// Scroll left
scrollLeftButton.addEventListener("click", () => {
  popularUsesElement.scrollLeft -= scrollAmount;
});
