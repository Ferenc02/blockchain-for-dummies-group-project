// TODO: Mobile responsiveness for card scrolling
// TODO: Fix all bugs in the card creator and write comments explaining the code

/* Import card content from json file*/
import { cardContent } from "../assets/card_content.js";

let rootStyles = getComputedStyle(document.documentElement);

/* css variables for colors so the cards can have different colors*/
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
  let color_index = 0; // Color index is set to 0 to start from the first color in the palette
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

    color_index++; // Increment color index

    /* If the color index is greater than or equal to the length of the css variables array, reset the color index to 0 so the colors can never end*/
    if (color_index >= cssVariables.length) {
      color_index = 0;
    }
  });

  /* If the number of popular uses cards is greater than 3, make the scroll buttons visible*/
  if (cardContent.popular_uses.length > 3) {
    scrollRightPopularButton.style.visibility = "visible";
    scrollLeftPopularButton.style.visibility = "visible";
  }

  const scrollAmount =
    popularUsesElement.querySelector(".card").offsetWidth +
    parseInt(window.getComputedStyle(popularUsesElement).gap, 10);

  // Scroll right
  scrollRightPopularButton.addEventListener("mousedown", () => {
    handleScroll(popularUsesElement, 1, scrollAmount); // Scroll right
  });

  // Scroll left
  scrollLeftPopularButton.addEventListener("mousedown", () => {
    handleScroll(popularUsesElement, -1, scrollAmount); // Scroll left
  });
};

// Create cards for innovative uses
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
  scrollRightInnovativeButton.addEventListener("mousedown", () => {
    handleScroll(innovativeUsesElement, 1, scrollAmount); // Scroll right
  });

  // Scroll left
  scrollLeftInnovativeButton.addEventListener("mousedown", () => {
    handleScroll(innovativeUsesElement, -1, scrollAmount); // Scroll left
  });
};

/* Generate cards for popular and innovative uses*/
generatePopularUsesCard();
generateInnovativeUsesCard();

const isMobile = window.matchMedia(
  "only screen and (max-width: 760px)"
).matches;

// Function to handle scrolling
const handleScroll = (element, direction, amount) => {
  element.style.scrollBehavior = "smooth";
  element.scrollLeft += direction * amount;

  // Reset scroll behavior after scrolling so that the user can scroll smoothly while dragging
  setTimeout(() => {
    element.style.scrollBehavior = "initial";
  }, 300); // Adjust timeout to match scroll duration if needed
};

if (!isMobile) {
  const cardsContainers = document.querySelectorAll(".cards-container");
  const cards = document.querySelectorAll(".card");

  let isMouseDown = false;
  let startX;
  let scrollLeft;
  let velocity;

  /* Add event listeners for scrolling for card containers*/
  cardsContainers.forEach((cardsContainer) => {
    cardsContainer.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      cardsContainer.classList.add("active");
      startX = e.pageX - cardsContainer.offsetLeft;
      scrollLeft = cardsContainer.scrollLeft;
    });

    cardsContainer.addEventListener("mouseleave", () => {
      if (isMouseDown) snapToNearestCard();
      isMouseDown = false;
      cardsContainer.classList.remove("active");
    });

    cardsContainer.addEventListener("mouseup", () => {
      snapToNearestCard();
      isMouseDown = false;
      cardsContainer.classList.remove("active");
    });

    cardsContainer.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - cardsContainer.offsetLeft;
      const walk = x - startX; // Calculate distance moved
      velocity = walk * 0.1; // Adjust the multiplier for smoothness
      cardsContainer.scrollLeft = scrollLeft - walk;
    });

    /* Function to snap to the nearest card */
    function snapToNearestCard() {
      const cardWidth =
        cards[0].offsetWidth +
        parseInt(getComputedStyle(cardsContainer).gap, 10);
      const currentScroll = cardsContainer.scrollLeft;
      const nearestCardIndex = Math.round(currentScroll / cardWidth); // Find the closest card
      const newScrollPosition = nearestCardIndex * cardWidth;

      // Smoothly scroll to the nearest card
      cardsContainer.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  });
}
