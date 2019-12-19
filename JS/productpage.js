$(document).ready(function(){

    function CartProduct(prod, amount) {
        this.product = prod;
        this.amount = amount;
    }

    let cartCheck = false;

    //Nedan hämtar vår information från Local storage och skriver ut det på produktsidan

    let specificProduct = JSON.parse(localStorage.getItem("products"));

    let prefix = "";
    if(window.location.href.indexOf("index.html") < 0) {
        prefix = "../";
    }

    let parseCart = JSON.parse(localStorage.getItem("cart")) || [];

    function printProduct() {

        $("#product-img").html("");
        $("#product-img-desktop").html("");
        $("#product-name").html("");
        $(".price").html("");


        $.each(specificProduct, function(i){
            $("#product-img").append($("<img>").attr({"src": prefix + specificProduct[i].picture, "class": "d-block w-100", "alt": specificProduct[i].name + " perfume"}));

            $("#product-img-desktop").append($("<img>").attr({"src": prefix + specificProduct[i].picture, "class": "d-block w-100", "alt": specificProduct[i].name + " perfume"}));
        
        
            $("#product-name").append(specificProduct[i].name);
        
            $(".price").append(specificProduct[i].smallprice + " SEK");

            $("#btn1").on("click", function(){
                // let cartis = localStorage.getItem("products");
                // let parseCart = JSON.parse(cartis);
                let newItem = new CartProduct(specificProduct[0], 1);
                // let cartItem = JSON.stringify(newItem);
                console.log(newItem);

                // localStorage.setItem("cart", cartItem);
                parseCart.push(newItem);

                console.log(parseCart);

                console.log(parseCart[i].product.name)
                console.log(specificProduct[i].name)

                if (parseCart.length === 0) {
                    parseCart.push(newItem);
                    localStorage.setItem("cart", JSON.stringify(parseCart));

                }

                else {
                    $(parseCart).each(function(i){
                        if (parseCart[i].product.name === specificProduct.name) {
                            parseCart[i].amount++;
                            cartCheck = true;
                            console.log("TJO");
                        }
                    });
                    if (cartCheck = false){
                        parseCart.push(newItem);
                    }
                    localStorage.setItem("cart", JSON.stringify(parseCart));
                }

                // addToCart(parseCart[0]);
                // specificProduct.push(specificProduct[0]);
                // localStorage.setItem('cart', JSON.stringify(specificProduct));
                cartCount();
                printCart();
        
                
                $(".cart-notification").toggleClass("message-active");
            })
        })
    }


    function printCart() {

        $(".cart-prod-container").html("");

        let prefix = "";
        if(window.location.href.indexOf("index.html") <= 0) {
            prefix = "../";
        }

        //Räknar ut totalen av alla produkter i varukorgen och skriver ut
        let total = 0;

        $.each(parseCart, function(i){

            let cartProdContainer = $("<div>").addClass("col-12 container prod-container d-flex");
            let imgCartContainer = $("<div>").addClass("col-4 img-cart");
            let imgCart = $("<img>").attr({"src":prefix + parseCart[i].product.picture, "class": "ml-2", "alt": parseCart[i].product.name + " perfume"});
            let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
            let cartUl = $("<ul>").addClass("cart-name-size pt-4");
            let cartName = $("<p>").attr("id", "name" +i).html(parseCart[i].product.name);
            let cartSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
            let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4").attr("id", "cart-prod-price"+i);
            let cartPrice = $("<p>").attr({"class": "pr-2 text-right price", "id": "price" +i}).html((parseCart[i].product.smallprice)*(parseCart[i].amount) + "  SEK");
            let quantityWrapper = $("<span>").addClass("input-group pl-2 d-flex justify-content-end");
            let inputMinus = $("<input>").attr({"type": "button", "id": "button-minus"+i, "value": "-", "class": "button-minus btn pl-0 pr-1", "data-field": "quantity"});
            let inputValue = $("<input>").attr({"type": "number", "id": "number"+i, "step": 1, "max": "", "value": parseCart[i].amount, "class": "quantity-field", "name": "quantity"});
            let inputPlus = $("<input>").attr({"type": "button", "id": "button-plus"+i, "value": "+", "class": "button-plus btn p-0 mr-2", "data-field": "quantity"});


            $(".cart-prod-container").append(cartProdContainer);
            cartProdContainer.append(imgCartContainer, cartInfo, cartPriceContainer);
            imgCartContainer.append(imgCart);
            cartInfo.append(cartUl);
            cartUl.append(cartName, cartSize);
            cartPriceContainer.append(cartPrice, quantityWrapper);
            quantityWrapper.append(inputMinus, inputValue, inputPlus);

            $("#btnCO").on("click", function(){
                cart.push(parseCart[i]);
                addToCart();
                putInStorage();
                location.href = "html/cart.html";
            }) 
            // ökar antal :)
            $(inputPlus).on("click",function(){
                parseCart[i].amount++;
                localStorage.setItem('cart',JSON.stringify(parseCart));
                

                printCart();
                cartCount();
            })
            
            $(inputMinus).on("click",function(){
                parseCart[i].amount--;
                
                if (parseCart[i].amount === 0 ){
                    
                    parseCart.splice(i, 1);
                }
                
                localStorage.setItem('cart',JSON.stringify(parseCart));
                printCart();
                cartCount();
            })


            total += parseCart[i].product.smallprice*parseCart[i].amount;
        })

        $("#totPrice").html(total + " SEK");

    }

//     function addToCart(cartProduct) {
//         //Klass för produkten som skickas till varukorgen  

//         let gotProduct = false;
//         specificProduct.forEach(function(item) {
//             if(item.product.name === cartProduct.name) {
//                 gotProduct =  true;
//                 item.amount++;
//             }
//         });

//         if (gotProduct === false) {
//             specificProduct.push(new CartProduct(cartProduct, 1));
//         }

//         cartCount();

//         localStorage.setItem("cart", JSON.stringify(specificProduct));
// }

    function cartCount() {
        let total = 0;
        for (let i = 0; i < parseCart.length; i++) {
            total += parseCart[i].amount;
            
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

    // $("#btn1").on("click", function(){
    //     // addToCart(checkoutProducts[0]);
    //     // checkoutProducts.push(checkoutProducts[0]);
    //     // localStorage.setItem('cart', checkoutProducts);
    //     cartCount();
    //     printCart();
    //     addToCart2(checkoutProducts[0]);

    //     console.log(this.click)
    //     $(".cart-notification").toggleClass("message-active");
    // $("#btn1").on("click", function(){

    //     addToCart(parseCart[0]);
    //     parseCart.push(parseCart[0]);
    //     localStorage.setItem('cart', JSON.stringify(parseCart));
    //     cartCount();
    //     printCart();

        
    //     $(".cart-notification").toggleClass("message-active");

    //     console.log(i);
    // })
//// CHARLIES PÅHITT
//     function addToCart2(cartProduct) {
//         //Klass för produkten som skickas till varukorgen  

//         let gotProduct = false;
//         parseCart.forEach(function(item) {
//             if(item.product.name === cartProduct.name) {
//                 gotProduct =  true;
//                 item.amount++;
//             }
//         });

//         if (gotProduct === false) {
//             parseCart.push(new CartProduct(cartProduct, 1));
//         }

//         cartCount();

//         localStorage.setItem("cart", JSON.stringify(parseCart));
// }   ///// SLUT PÅ PÅ

    // Chat modal

    $(".open-button").on("click", function(){
        $("#myForm").css("display", "block");
    }) 

    $(".cancel").on("click", function(){
        $("#myForm").css("display", "none");
    })

    printProduct();
    
});