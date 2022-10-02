if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}
function ready(){
    var removeButton= document.getElementsByClassName('btn-danger')
    for( var i=0 ;i < removeButton.length ;i++){
        var button = removeButton[i];
        button.addEventListener('click', removeFromCart);
    }
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for(var i=1 ; i < cartRows.length ;i++){
        var cartRow = cartRows[i]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        quantityElement.addEventListener('change', changeQuantity)
    }
    var addToCartButtons=document.getElementsByClassName('shop-item-btn')
    for(var i=0; i< addToCartButtons.length ;i++){
        var addToCartButton = addToCartButtons[i]
        addToCartButton.addEventListener('click',addToCartClicked)
    }
    var purchaseButton = document.getElementsByClassName('btn-purchase')[0]
    purchaseButton.addEventListener('click', purchase) 
}
function purchase(event){
    alert("the items are purchased now")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while( cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
}
function addToCartClicked(event){
    var button = event.target
    var price = button.parentElement.parentElement.getElementsByClassName('shop-item-price')[0].innerText
    var title = button.parentElement.parentElement.getElementsByClassName('shop-item-title')[0].innerText
    var imagesrc = button.parentElement.parentElement.getElementsByClassName('shop-item-image')[0].src
    addToCart(price , title , imagesrc)
}
function addToCart(price , title , imagesrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartRowContent = `<div class="cart-item cart-column">
    <img class="cart-item-img"src="${imagesrc}" alt="image of first album">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}
</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger"type="button">REMOVE</button>
</div>`
    cartRow.innerHTML = cartRowContent
    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    for( var i=0; i < cartItemsNames.length ;i++){
        if(cartItemsNames[i].innerText == title){
            alert("this is been added to the cart")
            return
        }
    }
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeFromCart)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',changeQuantity)
    
    updateTotal()
}
function changeQuantity(event){
    button = event.target
    if(isNaN(button.value) || button.value<=0){
        button.value = 1
    }
    updateTotal()
}
function removeFromCart(event){
   var buttonClicked= event.target;
   buttonClicked.parentElement.parentElement.remove();
   updateTotal();
}

function updateTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total=0;
    for(var i=0 ; i < cartRows.length ;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0].value
        var price = parseFloat(priceElement.innerText.replace('Rs',''))
        total =total + price*quantityElement
    }   
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText ='Rs'+ total;
}