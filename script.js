// cart open close
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// open cart
cartIcon.onclick = () => {
    cart.classList.add("cart-active");
};

// close cart
closeCart.onclick = () => {
    cart.classList.remove("cart-active");
};

//making add to cart
//cart working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
    } else {
    ready();
    }

// Making Function
function ready(){
    //Remove item from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for(var i = 0 ; i <removeCartButtons.length; i++){
        var button=removeCartButtons[i];
        button.addEventListener("click",removeCartItem);
    }
    //Quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0 ; i <quantityInputs.length; i++){
        var input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0 ; i <addCart.length; i++){
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }
}

//Remove cart Item
function removeCartItem(event){
    var buttonClicked =event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//Quantity Changed
function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}

//Add Cart Function









//Update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('RS.',''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    //if price contain some cents
        total = Math.round(total *100)/100;
        document.getElementsByClassName("total-price")[0].innerText = '$' + total;

    }


//local storage (keep item in cart when page refresh with localstorage)
function saveCartItems () {
    var cartCintent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartCintent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
