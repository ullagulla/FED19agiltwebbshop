$(document).ready(function () {

    function CartProduct(prod, amount) {
        this.product = prod;
        this.amount = amount;
    }


    //Nedan hämtar vår information från Local storage och skriver ut det på produktsidan

    let specificProduct = JSON.parse(localStorage.getItem("products"));

    let prefix = "";
    if (window.location.href.indexOf("index.html") < 0) {
        prefix = "../";
    }

    let parseCart = JSON.parse(localStorage.getItem("cart")) || [];

    function printProduct() {

        $("#product-img").html("");
        $("#product-img-desktop").html("");
        $("#product-name").html("");
        $(".price").html("");


        // $.each(specificProduct, function(i){
        $("#product-img").append($("<img>").attr({
            "src": prefix + specificProduct.picture,
            "class": "d-block w-100",
            "alt": specificProduct.name + " perfume"
        }));

        $("#product-img-desktop").append($("<img>").attr({
            "src": prefix + specificProduct.picture,
            "class": "d-block w-100",
            "alt": specificProduct.name + " perfume"
        }));


        $("#product-name").append(specificProduct.name);

        $(".price").append(specificProduct.smallprice + " SEK");

        $("#btn1").on("click", function () {
            let newItem = new CartProduct(specificProduct, 1);

            if (parseCart.length === 0) {
                parseCart.push(newItem);
                localStorage.setItem("cart", JSON.stringify(parseCart));

            } else {
                let cartCheck = false;
                $(parseCart).each(function (i) {
                    console.log(parseCart[i].product.name)
                    console.log(specificProduct.name)
                    if (parseCart[i].product.name === specificProduct.name) {
                        parseCart[i].amount++;
                        cartCheck = true;
                        console.log("TJO");
                    }
                });
                if (cartCheck === false) {
                    parseCart.push(newItem);
                }
                localStorage.setItem("cart", JSON.stringify(parseCart));
            }

            cartCount();
            printCart();


            $(".cart-notification").toggleClass("message-active");
        })
    }

    //Skapar upp produkterna i varukorgen

    function printCart() {

        $(".cart-prod-container").html("");

        let prefix = "";
        if (window.location.href.indexOf("index.html") <= 0) {
            prefix = "../";
        }

        //Räknar ut totalen av alla produkter i varukorgen och skriver ut
        let total = 0;

        $.each(parseCart, function (i) {

            let cartProdContainer = $("<div>").addClass("col-12 container prod-container d-flex");
            let imgCartContainer = $("<div>").addClass("col-4 img-cart");
            let imgCart = $("<img>").attr({
                "src": prefix + parseCart[i].product.picture,
                "class": "ml-2",
                "alt": parseCart[i].product.name + " perfume"
            });
            let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
            let cartUl = $("<ul>").addClass("cart-name-size pt-4");
            let cartName = $("<p>").attr("id", "name" + i).html(parseCart[i].product.name);
            let cartSize = $("<p>").append($("<p>")).attr({
                "id": "size"
            }).html("50 ml");
            let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4").attr("id", "cart-prod-price" + i);
            let cartPrice = $("<p>").attr({
                "class": "pr-2 text-right price",
                "id": "price" + i
            }).html((parseCart[i].product.smallprice) * (parseCart[i].amount) + "  SEK");
            let quantityWrapper = $("<span>").addClass("input-group pl-2 d-flex justify-content-end");
            let inputMinus = $("<input>").attr({
                "type": "button",
                "id": "button-minus" + i,
                "value": "-",
                "class": "button-minus btn pl-0 pr-1",
                "data-field": "quantity"
            });
            let inputValue = $("<input>").attr({
                "type": "number",
                "id": "number" + i,
                "step": 1,
                "max": "",
                "value": parseCart[i].amount,
                "class": "quantity-field",
                "name": "quantity"
            });
            let inputPlus = $("<input>").attr({
                "type": "button",
                "id": "button-plus" + i,
                "value": "+",
                "class": "button-plus btn p-0 mr-2",
                "data-field": "quantity"
            });


            $(".cart-prod-container").append(cartProdContainer);
            cartProdContainer.append(imgCartContainer, cartInfo, cartPriceContainer);
            imgCartContainer.append(imgCart);
            cartInfo.append(cartUl);
            cartUl.append(cartName, cartSize);
            cartPriceContainer.append(cartPrice, quantityWrapper);
            quantityWrapper.append(inputMinus, inputValue, inputPlus);

            $("#btnCO").on("click", function () {
                cart.push(parseCart[i]);
                addToCart();
                putInStorage();
                location.href = "html/cart.html";
            })
            // ökar antal :)
            $(inputPlus).on("click", function () {
                parseCart[i].amount++;
                localStorage.setItem('cart', JSON.stringify(parseCart));


                printCart();
                cartCount();
            })

            //Minskar antal

            $(inputMinus).on("click", function () {
                parseCart[i].amount--;

                if (parseCart[i].amount === 0) {

                    parseCart.splice(i, 1);
                }

                localStorage.setItem('cart', JSON.stringify(parseCart));
                printCart();
                cartCount();
            })


            total += parseCart[i].product.smallprice * parseCart[i].amount;
        })

        $("#totPrice").html(total + " SEK");

    }

    function cartCount() {
        let total = 0;
        for (let i = 0; i < parseCart.length; i++) {
            total += parseCart[i].amount;

        }
        $(".badge-icon").html(total);
    }

    //vår Local storage

    function putInStorage() {
        let stringStorage = JSON.stringify(storage);
        let cartStringify = JSON.stringify(cart);
        // localStorage.clear("products");
        localStorage.setItem("products", stringStorage);
        localStorage.setItem("stringCart", cartStringify);
    }

    $("#btn2").on("click", function (event) {
        $(".icons").find("img:first").attr("src", "../images/heart-pink.png").css({
            "animation": "beat .25s",
            "animation-iteration-count": "3",
            "transform-origin": "center"
        })
    })

    // Chat modal

    $(".open-button").on("click", function () {
        $("#myForm").css("display", "block");
    })

    $(".cancel").on("click", function () {
        $("#myForm").css("display", "none");
    })

    printProduct();
    printCart();
    cartCount();

});