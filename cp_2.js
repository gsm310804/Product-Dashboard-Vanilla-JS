const apiURL = "https://www.course-api.com/javascript-store-products";

function fetchProductsThen() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.log("Fetch error:", error);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch(apiURL);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const productContainer = document.querySelector("#product-container");
  productContainer.innerHTML = "";

  products.slice(0, 5).forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const productName = document.createElement("h3");
    productName.textContent = product.fields.name;

    const productImage = document.createElement("img");
    productImage.src = product.fields.image[0].url;
    productImage.alt = product.fields.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${(product.fields.price / 100).toFixed(2)}`;

    card.appendChild(productImage);
    card.appendChild(productName);
    card.appendChild(productPrice);

    productContainer.appendChild(card);
  });
}

function handleError(error) {
  console.log(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();