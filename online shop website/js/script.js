let products = [
  { name: "Shoes", price: 20, image: "images/shoes.png" },
  { name: "Bag", price: 15, image: "images/bag.png" }
];

let cart = [];



function displayProducts(list = products) {
  let container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(function(p) {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5>${p.name}</h5>
            <p>$${p.price}</p>
            <button onclick="addToCart('${p.name}')">Add</button>
          </div>
        </div>
      </div>
    `;
  });
}




function addToCart(name) {
  let product = products.find(function(p) {
    return p.name === name;
  });

  let found = cart.find(function(item) {
    return item.name === name;
  });

  if (found) {
    found.qty++;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  alert("Added");
}


function displayCart() {
  let box = document.getElementById("cart-items");
  if (!box) return;

  box.innerHTML = "";
  let total = 0;

  cart.forEach(function(item, i) {
    total += item.price * item.qty;

    box.innerHTML += `
      ${item.name} - $${item.price}
      <button onclick="minus(${i})">-</button>
      ${item.qty}
      <button onclick="plus(${i})">+</button>
      <button onclick="removeItem(${i})">x</button>
      <br>
    `;
  });




  let totalBox = document.getElementById("total");
  if (totalBox) {
    totalBox.innerText = "Total: $" + total;
  }
}


function plus(i) {
  cart[i].qty++;
  displayCart();
}


function minus(i) {
  if (cart[i].qty > 1) {
    cart[i].qty--;
  }
  displayCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  displayCart();
}
function searchProduct() {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(function(p) {
    return p.name.toLowerCase().includes(value);
  });

  displayProducts(filtered);
}



displayProducts();
displayCart();

let btn = document.getElementById("darkBtn");

if (btn) {
  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
}