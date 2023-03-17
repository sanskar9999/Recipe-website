// Define app ID and app key
const app_id = "4764fb14";
const app_key = "cf8fa51343d68c742e43567a2e665980";

// Get button and cards section elements
const button = document.querySelector("button");
const cardsSection = document.querySelector(".Cards-section");

// Function to create a recipe card from a hit
const createCard = ({ recipe }) => {
  // Create DOM elements for card, card body, image, title, description, and button
  const card = document.createElement("div");
  card.classList.add("card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card__body");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card__image");
  cardImage.setAttribute("src", recipe.image);
  cardImage.setAttribute("alt", recipe.label);

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card__title");
  cardTitle.textContent = recipe.label;

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card__description");
  cardDescription.textContent =
    "Take your boring salads up a knotch. This recipe is perfect for lunch and only contains 5 ingredients!";

  const cardBtn = document.createElement("a");
  cardBtn.classList.add("card__btn");
  cardBtn.setAttribute("href", recipe.url);
  cardBtn.textContent = "View Recipe";

  // Append child elements to create card
  cardBody.appendChild(cardImage);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);
  card.appendChild(cardBody);
  card.appendChild(cardBtn);

  return card;
};

// Function to fetch recipes and display them on the page
const getRecipe = async () => {
  // Get input element
  const input = document.querySelector("input");

  try {
    // Fetch recipes using input value and app ID/key
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${input.value}&app_id=${app_id}&app_key=${app_key}`
    );
    const data = await response.json();

    // Clear cards section and create recipe cards for each hit
    cardsSection.innerHTML = "";
    data.hits.forEach((hit) => {
      const card = createCard(hit);
      cardsSection.appendChild(card);
    });
  } catch (error) {
    // Log error and display error message to user
    console.error(error);
    alert("An error occurred while fetching recipes. Please try again later.");
  }
};

// Add click event listener to button
button.addEventListener("click", getRecipe);
