const apiURL = "https://www.course-api.com/javascript-store-products";

// Capitalizes each word in the product name
function capitalizeWords(text) {
  return text.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

// Uses fetch() with .then() and .catch()
function fetchProductsThen() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        console.log(capitalizeWords(product.fields.name));
      });
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    });
}

// Uses async/await with try/catch
async function fetchProductsAsync() {
  try {
    const response = await fetch(apiURL);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

// Displays the first 5 products on the page
function displayProducts(products) {
  const productContainer = document.querySelector("#product-container");
  productContainer.innerHTML = "";

  products.slice(0, 5).forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.fields.image[0].url;
    productImage.alt = capitalizeWords(product.fields.name);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productName = document.createElement("h3");
    productName.textContent = capitalizeWords(product.fields.name);

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${(product.fields.price / 100).toFixed(2)}`;

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    card.appendChild(productImage);
    card.appendChild(productInfo);

    productContainer.appendChild(card);
  });
}

// Reusable error handler
function handleError(error) {
  console.log(`An error occurred: ${error.message}`);
}

// Call both functions
fetchProductsThen();
fetchProductsAsync();