/* Import card content from json file*/
import { cardContent } from "../assets/card_content.js";

/* Access popular uses and innovative uses elements*/
let popularUsesElement = document.querySelector(".popular-uses-container");
let innovativeUsesElement = document.querySelector(
  ".innovative-uses-container"
);

// Create cards for popular uses
cardContent.popular_uses.forEach((card) => {
  popularUsesElement.innerHTML += `
    <div class="card">
        <div class="card-title-container">
        <img src="${card.icon}" alt="icon" />
        <h2>${card.title}</h2>
        </div>
        <div class="card-content">
        <p>${card.overview}</p>
        <p>${card.example}</p>
        </div>
    </div>
    `;
});
