// TODO: Mobile responsiveness for card scrolling
// TODO: Fix all bugs in the card creator and write comments explaining the code

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
const scrollLeftPopularButton = document.querySelector(".scroll-left-popular");
const scrollRightPopularButton = document.querySelector(
  ".scroll-right-popular"
);
const scrollLeftInnovativeButton = document.querySelector(
  ".scroll-left-innovative"
);
const scrollRightInnovativeButton = document.querySelector(
  ".scroll-right-innovative"
);

// Create cards for popular uses
let generatePopularUsesCard = () => {
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
    scrollRightPopularButton.style.visibility = "visible";
    scrollLeftPopularButton.style.visibility = "visible";
  }

  const scrollAmount =
    popularUsesElement.querySelector(".card").offsetWidth +
    parseInt(window.getComputedStyle(popularUsesElement).gap, 10);

  // Scroll right
  scrollRightPopularButton.addEventListener("click", () => {
    popularUsesElement.scrollLeft += scrollAmount;
  });

  // Scroll left
  scrollLeftPopularButton.addEventListener("click", () => {
    popularUsesElement.scrollLeft -= scrollAmount;
  });
};

let generateInnovativeUsesCard = () => {
  // Color index is set to 3 to start from the fourth color in the palette
  let color_index = 3;
  cardContent.innovative_uses.forEach((card) => {
    innovativeUsesElement.innerHTML += `
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

  if (cardContent.innovative_uses.length > 3) {
    scrollRightInnovativeButton.style.visibility = "visible";
    scrollLeftInnovativeButton.style.visibility = "visible";
  }

  const scrollAmount =
    innovativeUsesElement.querySelector(".card").offsetWidth +
    parseInt(window.getComputedStyle(innovativeUsesElement).gap, 10);

  // Scroll right
  scrollRightInnovativeButton.addEventListener("click", () => {
    innovativeUsesElement.scrollLeft += scrollAmount;
  });

  // Scroll left
  scrollLeftInnovativeButton.addEventListener("click", () => {
    innovativeUsesElement.scrollLeft -= scrollAmount;
  });
};

generatePopularUsesCard();
generateInnovativeUsesCard();
