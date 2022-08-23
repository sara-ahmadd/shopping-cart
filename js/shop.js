import products from "./products.js";
let allProducts = [...products];
const productsSection = document.querySelector("#products");
let cartNumber = document.querySelector(".cart-number");

let cart = JSON.parse(localStorage.getItem("cartOfItems")) || [];

let createProductsContainer = () => {
  productsSection.innerHTML = allProducts
    .map((product) => {
      let { id, name, price, desc, img } = product;
      let search = cart.find((prod) => prod.id == id) || [];
      return ` <div class="card" id="${id}">
          <div class="img"><img src="${img}" alt="" /></div>
          <h2 class="name-of-product">${name}</h2>
          <p class="description">
          ${desc}
          </p>
          <div class="price">
            <h1>$ ${price}</h1>
            <div class="amount-box">
              <div id="minus-${id}" class="minus">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M18.25 12.25L5.75 12.25"
                  ></path>
                </svg>
              </div>
              <div id="amount" data-amount="${id}"> ${
        search.amount === undefined ? 0 : search.amount
      } </div>
              <div id="plus-${id}" class="plus">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 5.75V18.25"
                  ></path>
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M18.25 12L5.75 12"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        `;
    })
    .join("");
};
createProductsContainer();

let addToCart = (item) => {
  cart.push({
    id: item.dataset.amount,
    amount: 1,
  });
};

/*loop over each product to specify increase and decrease 
in quantity for each one*/
allProducts.map((product) => {
  let { id } = product;
  let minus = document.querySelector(`#minus-${id}`);
  minus.onclick = () => {
    decrement(minus.nextElementSibling);
  };
  let plus = document.querySelector(`#plus-${id}`);
  plus.onclick = () => {
    increment(plus.previousElementSibling);
  };
});

//increment function
let increment = (item) => {
  item.innerHTML++;
  let search = cart.find((object) => object.id === item.dataset.amount);
  search === undefined ? addToCart(item) : (search.amount += 1);
  updateCart();
  localStorage.setItem("cartOfItems", `${JSON.stringify(cart)}`);
};

//decrement function
let decrement = (item) => {
  item.innerHTML > 0 ? item.innerHTML-- : (item.innerHTML = 0);
  let search = cart.find((object) => object.id === item.dataset.amount);
  if (search === undefined) return;
  else if (search.amount === 0) {
    return;
  } else {
    search.amount -= 1;
  }
  cart = cart.filter((item) => item.amount !== 0);
  localStorage.setItem("cartOfItems", `${JSON.stringify(cart)}`);
  updateCart();
};

//amount of products in the cart.
let updateCart = () => {
  cart.length !== 0
    ? (cartNumber.innerHTML = cart
        .map((product) => product.amount)
        .reduce((curr, accum) => curr + accum, 0))
    : (cartNumber.innerHTML = 0);
};
updateCart();

