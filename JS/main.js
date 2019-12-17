$(document).ready(function(){

    //Klass med alla egenskaper för våra objekt som finns längre ned

    function Product(n, sp, lp, pic) {

        this.name = n;
        this.smallprice = sp;
        this.largeprice = lp;
        this.picture = pic;
    
    }

    //Våra objekt

    let prod1 = new Product("Super Cedar", 1200, 1850, "images/serenity-supercedar.jpg");

    let prod2 = new Product("Sunday Cologne", 1200, 1850, "images/serenity-sundaycologne.jpg");

    let prod3 = new Product("Bibliothèque", 1200, 1850, "images/serenity-bibliotheque.jpg");

    let prod4 = new Product("Bal d'Afrique", 1200, 1850, "images/serenity-baldafrique.jpg");  

    let prod5 = new Product("Blanche", 1200, 1850, "images/serenity-blanche.jpg");  
    
    let prod6 = new Product("Pulp", 1200, 1850, "images/serenity-pulp.jpg");    

    let products = [prod1, prod2, prod3, prod4, prod5, prod6];

    // Klass för objekten som ska in i varukorgen

    function CartProduct(prod, amount) {
        this.product = prod;
        this.amount = amount;
    }

    //Nedan loopar igenom alla våra objekt och skapar upp dom i html

    let cart = [];
    let storage = [];
    let amount = [];

    $.each(products, function(i){

        let prodWrapper = $("<div>").addClass("prod-wrapper col-6 col-md-4 col-lg-4 pb-4");
        let hoverProduct = $("<div>").addClass("hover-div").attr("id", "hover" +i).on("click", function() {
            storage.push(products[i]);
            putInStorage();
            location.href = "html/produktsida.html";
        });
        let imgContainer = $("<div>").addClass("prod-img pb-3 pb-md-0");
        let img = $("<img>").attr({"src": products[i].picture, "alt": products[i].name + " perfume", "id": "pic"+i});
        let prodInfo = $("<div>").addClass("prod-info text-center").attr("id", "info"+i);
        let title = $("<p>").addClass("prod-name mb-0 pl-3 pt-3").html(products[i].name);
        let price = $("<p>").addClass("prod-price mb-0 pl-3").html(products[i].smallprice + " SEK");
        let iconsHover = $("<div>").addClass("icons-hover d-none d-lg-flex").attr("id", "icons-hover"+i);
        let hoverHeart = $("<img>").addClass("prod-heart pr-1").attr({"src": "images/heart-white.PNG", "id": "hover-heart" +i});
        let hoverCart = $("<img>").addClass("prod-cart pl-1").attr({"src": "images/cart-white.PNG", "id": "hover-cart" +i});
        let icons = $("<div>").addClass("prod-icons pr-1 pb-1");
        let heartIcon = $("<img>").addClass("heart-icon pr-1 pt-3").attr({"src": "images/heart.PNG", "id": "heart" +i});
        let cartIcon = $("<img>").addClass("cart-icon pr-1 pr-3 pt-3").attr({"src": "images/cart.PNG", "id": "cart" +i});

        $(".prod-container").append(prodWrapper);
        prodWrapper.append(hoverProduct);
        hoverProduct.append(imgContainer, prodInfo, iconsHover, icons);
        imgContainer.append(img);
        prodInfo.append(title, price);
        iconsHover.append(hoverHeart, hoverCart);
        icons.append(heartIcon, cartIcon);

        //Nedan visar info PÅ produkt-bilderna vid hover desktop

        if ($(window).width() > 990) {

            $("#hover"+i).hover(
                function(){
                    $("#info"+i).css({
                        opacity: "1",
                        transition: "all 0.5s"
                    });
                }, function(){
                    $("#info"+i).css({
                        opacity: "0",
                        transition: "all 0.5s"
                    })
                }
            );

            $("#hover"+i).hover(
                function(){
                    $("#icons-hover"+i).css({
                        opacity: "1",
                        transition: "all 0.5s"
                    });
                }, function(){
                    $("#icons-hover"+i).css({
                        opacity: "0",
                        transition: "all 0.5s"
                    })
                }
            );

            $("#hover-div"+i).hover(function() {
                $(this).find('img').attr("src", "../images/cart.png");
                  }, function() {
                $(this).find('img').attr("src", "../images/cart-white.png");
            });

        }

        else {
            $("#info"+i).css("opacity", "1");

            $("#icons-hover" +i).css("visibility", "hidden");
        }

        $("#heart"+i).on("click", function(event){
            $(".heart1").css("background-color", "pink");
            event.stopPropagation();
        })

        //Nedan funktion höjer värdet på badge (varukorg) med 1 samt sparar objekt vi klickar på I LOCAL STORAGE

        $("#hover-cart"+i).on("click", function(event){

            saveCart();

            addToCart(products[i]);

            event.stopPropagation();
            printCart();

            $(".cart-notification").toggleClass("message-active");

        });

        $("#cart"+i).on("click", function(event){

            saveCart();

            addToCart(products[i]);

            event.stopPropagation();
            printCart();

            $(".cart-notification").toggleClass("message-active");

        });

        function printCart() {

            $(".cart-prod-container").html("");

            let prefix = "";
            if(window.location.href.indexOf("index.html") <= 0) {
                prefix = "../";
            }

            localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : []

            localStorage.setItem("cart", JSON.stringify(cart));
            // let cartItems = localStorage.getItem("cart");
            let cartItems = JSON.parse(localStorage.getItem("cart"));

            $.each(cartItems, function(i){

                let imgCartContainer = $("<div>").addClass("col-4 img-cart");
                let imgCart = $("<img>").attr({"src":prefix + cartItems[i].product.picture, "class": "ml-2", "alt": cartItems[i].product.name + " perfume"});
                let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
                let cartUl = $("<ul>").addClass("cart-name-size pt-4");
                let cartName = $("<p>").attr("id", "name" +i).html(cartItems[i].product.name);
                let cartSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
                let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4").attr("id", "cart-prod-price"+i);
                let cartPrice = $("<p>").attr({"class": "pr-2 text-right price", "id": "price" +i}).html((cartItems[i].product.smallprice)*(cartItems[i].amount) + "  SEK");
                let quantityWrapper = $("<span>").addClass("input-group pl-2 d-flex justify-content-end");
                let inputMinus = $("<input>").attr({"type": "button", "id": "button-minus"+i, "value": "-", "class": "button-minus btn pl-0 pr-1", "data-field": "quantity"});
                let inputValue = $("<input>").attr({"type": "number", "id": "number"+i, "step": 1, "max": "", "value": cartItems[i].amount, "class": "quantity-field", "name": "quantity"});
                let inputPlus = $("<input>").attr({"type": "button", "id": "button-plus"+i, "value": "+", "class": "button-plus btn p-0 mr-2", "data-field": "quantity"});
    
    
                $(".cart-prod-container").append(imgCartContainer, cartInfo, cartPriceContainer);
                imgCartContainer.append(imgCart);
                cartInfo.append(cartUl);
                cartUl.append(cartName, cartSize);
                cartPriceContainer.append(cartPrice, quantityWrapper);
                quantityWrapper.append(inputMinus, inputValue, inputPlus);

                

            })

            //Räknar ut totalen av alla produkter i varukorgen och skriver ut
            let total = 0;

            for (let i = 0; i < cartItems.length; i++) {

                total += cartItems[i].product.smallprice*cartItems[i].amount;
                
            }
            $("#totPrice").html(total + " SEK");
    
        }

    });

    function putInStorage() {
            let stringStorage = JSON.stringify(storage);
            let cartStringify = JSON.stringify(cart);
            localStorage.clear("products");
            localStorage.setItem("products", stringStorage);
            localStorage.setItem("stringCart", cartStringify);
    }

    // let cartprod = new CartProduct(products, 1);

    function addToCart(cartProduct){
            //Klass för produkten som skickas till varukorgen  

            saveCart();

            let gotProduct = false;
            cart.forEach(function(item) {
                if(item.product.name === cartProduct.name) {
                    gotProduct =  true;
                    item.amount++;
                }
            });

            if (gotProduct === false) {
                cart.push(new CartProduct(cartProduct, 1));
            }

            cartCount();

            localStorage.setItem("cart", JSON.stringify(cart));
    }

    function cartCount(){
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].amount;
            
        }
        $(".badge-icon").html(total);
    }

    function saveCart(){
        let items;

        if (localStorage.getItem('cart') === null) {
            items = [];
        } 
        else {
            items = localStorage.getItem("cart");
        }
        items = JSON.parse(localStorage.getItem('cart'));

        console.log(items);
    }

});