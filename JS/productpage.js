$(document).ready(function(){

    function CartProduct(prod, amount) {
        this.product = prod;
        this.amount = amount;
    }

    //Nedan hämtar vår information från Local storage och skriver ut det på produktsidan

    let checkoutProducts = JSON.parse(localStorage.getItem("cart")) || [];


    let prefix = "";
    if(window.location.href.indexOf("index.html") < 0) {
        prefix = "../";
    }

    $("#product-img").append($("<img>").attr({"src": prefix + checkoutProducts[0].product.picture, "class": "d-block w-100", "alt": checkoutProducts[0].product.name + " perfume"}));

    $("#product-img-desktop").append($("<img>").attr({"src": prefix + checkoutProducts[0].product.picture, "class": "d-block w-100", "alt": checkoutProducts[0].product.name + " perfume"}));


    $("#product-name").append(checkoutProducts[0].product.name);

    $(".price").append(checkoutProducts[0].product.smallprice + " SEK");

    function printCart() {

        $(".cart-prod-container").html("");

        let prefix = "";
        if(window.location.href.indexOf("index.html") <= 0) {
            prefix = "../";
        }

        //Räknar ut totalen av alla produkter i varukorgen och skriver ut
        let total = 0;

        $.each(checkoutProducts, function(i){

            let cartProdContainer = $("<div>").addClass("col-12 container prod-container d-flex");
            let imgCartContainer = $("<div>").addClass("col-4 img-cart");
            let imgCart = $("<img>").attr({"src":prefix + checkoutProducts[i].product.picture, "class": "ml-2", "alt": checkoutProducts[i].product.name + " perfume"});
            let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
            let cartUl = $("<ul>").addClass("cart-name-size pt-4");
            let cartName = $("<p>").attr("id", "name" +i).html(checkoutProducts[i].product.name);
            let cartSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
            let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4").attr("id", "cart-prod-price"+i);
            let cartPrice = $("<p>").attr({"class": "pr-2 text-right price", "id": "price" +i}).html((checkoutProducts[i].product.smallprice)*(checkoutProducts[i].amount) + "  SEK");
            let quantityWrapper = $("<span>").addClass("input-group pl-2 d-flex justify-content-end");
            let inputMinus = $("<input>").attr({"type": "button", "id": "button-minus"+i, "value": "-", "class": "button-minus btn pl-0 pr-1", "data-field": "quantity"});
            let inputValue = $("<input>").attr({"type": "number", "id": "number"+i, "step": 1, "max": "", "value": checkoutProducts[i].amount, "class": "quantity-field", "name": "quantity"});
            let inputPlus = $("<input>").attr({"type": "button", "id": "button-plus"+i, "value": "+", "class": "button-plus btn p-0 mr-2", "data-field": "quantity"});


            $(".cart-prod-container").append(cartProdContainer);
            cartProdContainer.append(imgCartContainer, cartInfo, cartPriceContainer);
            imgCartContainer.append(imgCart);
            cartInfo.append(cartUl);
            cartUl.append(cartName, cartSize);
            cartPriceContainer.append(cartPrice, quantityWrapper);
            quantityWrapper.append(inputMinus, inputValue, inputPlus);

            $("#btnCO").on("click", function(){
                cart.push(checkoutProducts[i]);
                addToCart();
                putInStorage();
                location.href = "html/cart.html";
            }) 
            // ökar antal :)
            $(inputPlus).on("click",function(){
                checkoutProducts[i].amount++;
                localStorage.setItem('cart',JSON.stringify(checkoutProducts));
                

                printCart();
                cartCount();
            })
            
            $(inputMinus).on("click",function(){
                checkoutProducts[i].amount--;
                
                if (checkoutProducts[i].amount === 0 ){
                    
                    checkoutProducts.splice(i, 1);
                }
                
                localStorage.setItem('cart',JSON.stringify(checkoutProducts));
                printCart();
                cartCount();
            })


            total += checkoutProducts[i].product.smallprice*checkoutProducts[i].amount;
        })

        $("#totPrice").html(total + " SEK");

    }

    function addToCart(cartProduct) {
        //Klass för produkten som skickas till varukorgen  

        let gotProduct = false;
        checkoutProducts.forEach(function(item) {
            if(item.product.name === cartProduct.name) {
                gotProduct =  true;
                item.amount++;
            }
        });

        if (gotProduct === false) {
            checkoutProducts.push(new CartProduct(cartProduct, 1));
        }

        cartCount();

        localStorage.setItem("cart", JSON.stringify(checkoutProducts));
}

    function cartCount() {
        let total = 0;
        for (let i = 0; i < checkoutProducts.length; i++) {
            total += checkoutProducts[i].amount;
            
        }
        $(".badge-icon").html(total);
    }

    function putInStorage() {
        let stringStorage = JSON.stringify(storage);
        let cartStringify = JSON.stringify(cart);
        // localStorage.clear("products");
        localStorage.setItem("products", stringStorage);
        localStorage.setItem("stringCart", cartStringify);
}

    //Meddelande när produkt läggs till i varukorgen

    $("#btn1").on("click", function(){

        // addToCart(checkoutProducts[0]);
        checkoutProducts.push(checkoutProducts[0]);
        localStorage.setItem('cart', checkoutProducts);
        cartCount();
        printCart();

        
        $(".cart-notification").toggleClass("message-active");

        console.log(checkoutProducts[0]);
    })
//// CHARLIES PÅHITT
    function addToCart2(cartProduct) {
        //Klass för produkten som skickas till varukorgen  

        let gotProduct = false;
        checkoutProducts.forEach(function(item) {
            if(item.product.name === cartProduct.name) {
                gotProduct =  true;
                item.amount++;
            }
        });

        if (gotProduct === false) {
            checkoutProducts.push(new CartProduct(cartProduct, 1));
        }

        cartCount();

        localStorage.setItem("cart", JSON.stringify(checkoutProducts));
}   ///// SLUT PÅ PÅHITT

    // Chat modal

    $(".open-button").on("click", function(){
        $("#myForm").css("display", "block");
    }) 

    $(".cancel").on("click", function(){
        $("#myForm").css("display", "none");
    })
    
});