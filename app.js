// ABRIR Y CERRAR CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector("#cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});


// COMENZAR CUANDO EL DOCUMENTO ESTE LISTO

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start()
}

// COMENZAR
function start() {
    addEvents();
}

//ACTUALIZAR Y VOLVER A PRESENTAR
function update() {
    addEvents();
    updateTotal();
}

//EVENTOS
function addEvents() {

    //QUITAR ARTICULOS DEL CARRITO
    let cartRemove_btns = document.querySelectorAll(".cart-remove");

    console.log(cartRemove_btns);

    cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
});


    //CAMBIAR CANTIDAD DE ARTICULOS DEL CARRITO

    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");

    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //AÑADIR ARTICULOS AL CARRITO

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });
}

//COMPRAR ORDEN
const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buyOrden);

//FUNCIONES DE MANEJOS DE EVENTOS

let itemsAdded = [];

function handle_addCartItem() {
    let product = this.parentElement;
    console.log(product);
    let title = product.querySelector(".product-title").innerHTML;
    let priceText = product.querySelector(".product-price").textContent; // Usar textContent en lugar de innerHTML
    let price = parseFloat(priceText.replace("$", "").replace(",", "")); // Eliminar símbolos de moneda y separadores de miles

    let imgSrc = product.querySelector(".product-img").src;

    console.log(title, price, imgSrc);
    
    let newToAdd = {
        title,
        price,
        imgSrc
    };
    //EL ELEMENTO DE MANEJO YA EXISTENTE
    
    if(itemsAdded.find((el) => el.title === newToAdd.title)){
        alert("Este Articulo Ya Existe");
    } else {
        itemsAdded.push(newToAdd);
    }
    
    //AÑADIR PRODUCTOOS AL CARRITO

    let carBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = carBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

// Activar el icono del carrito
    cart.classList.add("active");

    update()
};

function handle_removeCartItem() {
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(
        (el) => el.title !== this.parentElement.querySelector(".cart-product-title").innerHTML
    );    
    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value); //PARA MANTENER EL NUMERO ENTERO

    update();
}

function handle_buyOrden() {
    if(itemsAdded.length <= 0){
        alert("¡Aún no hay ningun pedido para realizar! \nPorfavor haga un pedido primero");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Su pedido se realizó exitosamente")
    itemsAdded = [];
    update();
}

//FUNCIONES DE ACTUALIZAR Y RENDERIZAR
function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector(".total-price");
    let total=0;

    cartBoxes.forEach((cartBox) => {
    let priceElement  = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;

    total += price * quantity;
});

    total = total.toFixed(2);
    //MANTENER 2 DIGITOS DESPUES DEL PUNTO DECIMAL

    totalElement.innerHTML = "$" + total;
}

// =============== COMPONENTES HTML ========================

function cartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">$${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>

    <!-- ELIMINAR CART -->
    <i class="bx bxs-trash-alt cart-remove"></i>
    `;
}