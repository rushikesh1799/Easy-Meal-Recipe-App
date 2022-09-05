const getRecipeButton = document.querySelector("#get-recipe-btn");
const showMealDetailsContent = document.querySelector(".meal-details-content");
const outputRecipes = document.querySelector(".output");
const userInput = document.querySelector("#input-area");
const recipeCloseButton = document.querySelector("#recipe-close-btn");

getRecipeButton.addEventListener("click", getRecipes);
outputRecipes.addEventListener("click", getRecipeOfMeal);
recipeCloseButton.addEventListener("click", () => {
    showMealDetailsContent.parentElement.classList.remove("showRecipe");
});

function getRecipes(e) {
    let userValue = userInput.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userValue}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.meals)
            if (userValue == "") {
                let errorMessage = `Please enter the ingredient.`;
                outputRecipes.innerHTML = errorMessage;
                outputRecipes.classList.add("errorMessage");
            } else if (data.meals == null) {
                let errorMessage = `Sorry, We do not have any Recipe for ${userValue}.`;
                outputRecipes.innerHTML = errorMessage;
                outputRecipes.classList.add("errorMessage");
            } else {
                let output = ``;
                data.meals.forEach((meal) => {
                    output =
                        output +
                        `
                        <div class="meal-item" data-id=${meal.idMeal}>
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                outputRecipes.innerHTML = output;
                outputRecipes.classList.remove("errorMessage");
            }
        });
}

function getRecipeOfMeal(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal) {
    // console.log(meal)
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-ingredient">${meal.strCategory}</p>
        <div class="recipe-instructions">
            <h3>Instructions:</h3>
            ${meal.strInstructions}
        </div>
        <div class="recipe-image">
            <img src="${meal.strMealThumb}" alt="food Image">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    showMealDetailsContent.innerHTML = html;
    showMealDetailsContent.parentElement.classList.add("showRecipe");
}
