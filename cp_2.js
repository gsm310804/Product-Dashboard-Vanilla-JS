const apiURL = "https://www.course-api.com/javascript-store-products";

function capitalizeWords(text) {
  return text.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

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

  const customProducts = [
    { name: "High Back Bench", price: 89.99 },
    { name: "Grey Leather Couch", price: 399.99 },
    { name: "Accent Chair", price: 65.99 },
    { name: "Wooden Round Table", price: 85.99 },
    { name: "Dining Table", price: 169.99 }
  ];

  products.slice(0, 5).forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.fields.image[0].url;
    productImage.alt = customProducts[index].name;

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productName = document.createElement("h3");
    productName.textContent = customProducts[index].name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${customProducts[index].price.toFixed(2)}`;

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    card.appendChild(productImage);
    card.appendChild(productInfo);

    productContainer.appendChild(card);
  });
}

function handleError(error) {
  console.log(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();
