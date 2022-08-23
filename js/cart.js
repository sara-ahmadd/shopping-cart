import products from "./products.js";
let finalProducts = [...products];
let cart = JSON.parse(localStorage.getItem("cartOfItems")) || [];

let cartNumber = document.querySelector(".cart-number");

//update amount of products in the cart.
let updateCartContent = () => {
  cart.length !== 0
    ? (cartNumber.innerHTML = cart
        .map((product) => product.amount)
        .reduce((curr, accum) => curr + accum, 0))
    : (cartNumber.innerHTML = 0);
};
updateCartContent();

let totalCost = document.querySelector("#total-cost");

let productsDiv = document.querySelector("#final-products");

//create cards for the selected products in the cart.
let productsCards = () => {
  if (cart.length !== 0) {
    return (productsDiv.innerHTML = cart
      .map((x) => {
        let { id, amount } = x;
        let search = finalProducts.find((item) => item.id == id) || [];
        return `<div class='each-card' id='${id}'>
         <div class='img'>
          <img src='${search.img}'/>
         </div>
         <div class='text'>
         <div class='total'>Total : <h2 class='total-price'>$ ${
           search.price * amount
         }</h2></div>
           <div>
           <p id='name'>${search.name}</p>
           <p id='desc'>${search.desc}</p>
           <p><h2>$ ${
             search.price
           }</h2><span> Quantity : ${amount}</span></p></div>
           </div>
           <button class='close'>
           <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
              stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
               stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
          </svg>
          </button>
        </div>`;
      })
      .join(""));
  } else {
    productsDiv.innerHTML = "";
    totalCost.innerHTML = `
      <h1>Cart Is Empty.</h1>
      <button id="home"><a href="index.html">Back To Home.</a></button>
      `;
  }
};

productsCards();

//add all prices of the selected products in the cart.
let billCalculation = () => {
  if (cart.length !== 0) {
    let bill = cart
      .map((item) => {
        let { id, amount } = item;
        let search = finalProducts.find((item) => item.id === id) || [];
        console.log(search, id, amount);
        return amount * search.price;
      })
      .reduce((accu, curr) => accu + curr, 0);
    //update total cost in the bill.
    totalCost.innerHTML = `<h1>The Bill : $ ${bill}</h1>
      <div class='buttons'>
      <button id='clear-all'>Clear All</button>
      </div>`;
    console.log(bill, totalCost);
  } else return;
};

billCalculation();

let removeItem = (id) => {
  cart = cart.filter((item) => item.id !== id) || [];
  updateCartContent();
  billCalculation();
  localStorage.setItem("cartOfItems", `${JSON.stringify(cart)}`);
  console.log(JSON.parse(localStorage.getItem("cartOfItems")));
  productsCards();
};

let deleteBtns = Array.from(document.querySelectorAll(".close"));

//add event listener to the (x)button.
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    deleteBtn.parentElement.remove();
    removeItem(deleteBtn.parentElement.id);
    /*N.B:  i had to use (reload()) method 'cause all events
     stops completely after running this event listener */
    document.location.reload();
  });
});
//clear all cart content.
function clearAllProductsInCart() {
  cart = [];
  productsCards();
  updateCartContent();
  localStorage.setItem("cartOfItems", `${JSON.stringify(cart)}`);
}
let clearBtn = document.querySelector("#clear-all");

if (clearBtn !== null) {
  clearBtn.addEventListener("click", () => {
    clearAllProductsInCart();
  });
}
