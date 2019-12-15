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
        let prodInfo = $("<div>").addClass("prod-info").attr("id", "info"+i);
        let title = $("<p>").addClass("prod-name mb-0 pl-3 pt-3").html(products[i].name);
        let price = $("<p>").addClass("prod-price mb-0 pl-3").html(products[i].smallprice + " :-");
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

            // $("#hover-cart"+i).hover(function(){
            //     $(this).find("img").attr("src", function(){
            //         return src.replace("src","cart-white.png");
            //     }, function(){
            //     $(this).find('img').attr("src", "images/ui-ux-1.png");
            //     })  
            // })

        }

        else {
            $("#info"+i).css("opacity", "1");

            $("#icons-hover" +i).css("visibility", "hidden");
        }

        //meddelande när produkt läggs i varukorgen

        $("#cart0").on("click", function(){

            $(".cart-notification").toggleClass("message-active");
    
        });

        // $(".hover-div").on("click", function(){

        //     storage.push(products[i]);
        //     putInStorage();
        //     location.href = "html/produktsida.html";

        //     console.log(storage);

        // });

        $("#heart"+i).on("click", function(event){
            $(".heart1").css("background-color", "pink");
            event.stopPropagation();
        })

        //Nedan funktion höjer värdet på badge (varukorg) med 1 samt sparar objekt vi klickar på I LOCAL STORAGE

        $("#hover-cart"+i).on("click", function(event){

            storage[products[i].name] += 1;
            cart.push(products[i]);
            putInStorage();
            let babo = localStorage.getItem("stringCart");
            let boba = JSON.parse(babo);
            $(".badge-icon").text(boba.length);

            event.stopPropagation();
            putInCart();

            // cart.push(products[i]);
            // $(".badge-icon").html(cart.length);

            $(".cart-notification").toggleClass("message-active");

        });

        $("#cart"+i).on("click", function(event){

            storage[products[i].name] += 1;
            cart.push(products[i]);
            putInStorage();
            let babo = localStorage.getItem("stringCart");
            let boba = JSON.parse(babo);
            $(".badge-icon").text(boba.length);

            event.stopPropagation();
            putInCart();

            // cart.push(products[i]);
            // $(".badge-icon").html(cart.length);

            $(".cart-notification").toggleClass("message-active");

        });

        function putInCart() {

            let prefix = "";
            if(window.location.href.indexOf("index.html") <= 0) {
                prefix = "../";
            }
    
            let imgCartContainer = $("<div>").addClass("col-4 img-cart");
            let imgCart = $("<img>").attr({"src":prefix + products[i].picture, "class": "ml-2", "alt": products[i].name + " perfume"});
            let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
            let cartUl = $("<ul>").addClass("cart-name-size pt-4");
            let cartName = $("<p>").attr("id", "name" +i).html(products[i].name);
            let cartSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
            let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4 d-flex justify-content-end");
            let cartPrice = $("<p>").attr({"class": "pr-2", "id": "price" +i}).html(products[i].smallprice + " kr");

            $(".cart-prod-container").append(imgCartContainer, cartInfo, cartPriceContainer);
            imgCartContainer.append(imgCart);
            cartInfo.append(cartUl);
            cartUl.append(cartName, cartSize);
            cartPriceContainer.append(cartPrice);
    
        }

    });

    function putInStorage() {
            let stringStorage = JSON.stringify(storage);
            let cartStringify = JSON.stringify(cart);
            localStorage.clear("products");
            localStorage.setItem("products", stringStorage);
            localStorage.setItem("stringCart", cartStringify);
    }

});