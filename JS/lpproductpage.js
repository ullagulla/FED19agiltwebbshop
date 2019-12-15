$(document).ready(function(){


    //Nedan hämtar vår information från Local storage och skriver ut det på produktsidan

    let information = localStorage.getItem("product");
    let productInfo = JSON.parse(information);

    //Klass med alla egenskaper för våra objekt som finns längre ned

    function Product(n, sp, lp, pic, am) {

        this.name = n;
        this.smallprice = sp;
        this.largeprice = lp;
        this.picture = pic;
        this.amount = am;
    
    }

    //Våra objekt

    let prod1 = new Product("Super Cedar", 1200, 1850, "../images/serenity-supercedar.jpg", 1);

    let prod2 = new Product("Sunday Cologne", 1200, 1850, "../images/serenity-sundaycologne.jpg", 1);

    let prod3 = new Product("Bibliothèque", 1200, 1850, "../images/serenity-bibliotheque.jpg", 1);

    let prod4 = new Product("Bal d'Afrique", 1200, 1850, "../images/serenity-baldafrique.jpg", 1);  

    let prod5 = new Product("Blanche", 1200, 1850, "../images/serenity-blanche.jpg", 1);  
    
    let prod6 = new Product("La Tulipe", 1200, 1850, "../images/serenity-latulipe.jpg", 1);
    
    let prod7 = new Product("Sundazed", 1200, 1850, "../images/serenity-sundazed.jpg", 1);

    let prod8 = new Product("Rose of No Man's Land", 1200, 1850, "../images/serenity-roseofnomansland.jpg", 1);

    let prod9 = new Product("Pulp", 1200, 1850, "../images/serenity-pulp.jpg", 1);

    let products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9];

    //Nedan loopar igenom alla våra objekt och skapar upp dom i html

    // $.each(products, function(i){

    let cart = [];
    let storage = [];
    
    $.each(products, function(i){

        let prodContainer = $("<div>").addClass("prod-container col-6 col-md-4 col-lg-3 pb-4");
        let hoverProduct = $("<div>").addClass("hover-div").attr("id", "hover" +i).on("click", function() {
            putInCart();
        });
        let imgContainer = $("<div>").addClass("prod-img pb-3 pb-lg-0");
        let img = $("<img>").attr({"src": products[i].picture, "alt": products[i].name + " perfume", "id": "pic"+i});
        let prodInfo = $("<div>").addClass("prod-info").attr("id", "info"+i);
        let title = $("<p>").addClass("prod-name mb-0 pl-3 pt-3").html(products[i].name);
        let price = $("<p>").addClass("prod-price mb-0 pl-3").html(products[i].smallprice + " :-");
        let iconsHover = $("<div>").addClass("icons-hover d-flex").attr("id", "icons-hover"+i);
        let hoverHeart = $("<img>").addClass("prod-heart pr-1").attr({"src": "../images/heart-white.PNG", "id": "hover-heart" +i});
        let hoverCart = $("<img>").addClass("prod-cart pl-1").attr({"src": "../images/cart-white.PNG", "id": "hover-cart" +i});
        let icons = $("<div>").addClass("prod-icons pr-1 pb-1");
        let heartIcon = $("<img>").addClass("heart-icon pr-1 pt-3").attr({"src": "../images/heart.PNG", "id": "heart" +i});
        let cartIcon = $("<img>").addClass("cart-icon pr-1 pr-3 pt-3").attr({"src": "../images/cart.PNG", "id": "cart" +i});

        $(".lp-prod-wrapper").append(prodContainer);
        prodContainer.append(hoverProduct);
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

        $(".hover-div").on("click", function(){

            storage.push(products[i]);
            putInStorage();
            location.href = "produktsida.html";

        });

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
            localStorage.setItem(products[i].name, JSON.stringify(products[i]));
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
            if(window.location.href.indexOf("index.html") >= 0) {
                prefix = "../";
            }

            let imgCartContainer = $("<div>").addClass("col-4 img-cart");
            let imgLink = $("<a>").attr({"href": "produktsida.html", "class": "prod-link"});
            let imgCart = $("<img>").attr({"src":prefix + products[i].picture, "class": "ml-2", "alt": products[i].name + " perfume"});
            let cartInfo = $("<div>").addClass("col-4 cart-prod-info");
            let cartUl = $("<ul>").addClass("cart-name-size pt-4");
            let cartName = $("<p>").attr("id", "name" +i).html(products[i].name);
            let cartSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
            let cartPriceContainer = $("<div>").addClass("col-4 cart-prod-price pt-4 d-flex justify-content-end");
            let cartPrice = $("<p>").attr({"class": "pr-2", "id": "price" +i}).html(products[i].smallprice + " kr");

            $(".cart-prod-container").append(imgCartContainer, cartInfo, cartPriceContainer);
            imgCartContainer.append(imgLink);
            imgLink.append(imgCart);
            cartInfo.append(cartUl);
            cartUl.append(cartName, cartSize);
            cartPriceContainer.append(cartPrice);



            //     //$("<div>").attr({"class": "col-4 cart-prod-info"}).append($("ul")).attr({"class": "cart-prod-name"}).append([
            //         $(".cart-prod-name").append($("<p>").attr({"id": "name" +i,}).html(products[i].name)),
            //         $(".cart-prod-name").append($("<p>")).attr({"id": "size"}).html("50 ml")
            //     ]),
            //     $("<div>").attr({"class": "col-4 cart-prod-price"}).append([
            //         $(".cart-prod-price").append($("<p>").attr({"id": "price" +i}).html(products[i].smallprice + " kr"))
            //     // ])
            // ])

    
            // $(".img-cart").append($("<img>").attr({"src":prefix + products[i].picture, "class": "ml-2", "alt": products[i].name + " perfume"}));
    
            // $(".cart-prod-name").append($("<p>").attr({"id": "name" +i,}).html(products[i].name));

            // $(".cart-prod-price").append($("<p>").attr({"id": "price" +i,}).html(products[i].smallprice + " kr"));
    
        }

    });

    // function addItemz(){
        

    // }

    function putInStorage() {
        let stringStorage = JSON.stringify(storage);
        let cartStringify = JSON.stringify(cart);
        localStorage.clear("products");
        localStorage.setItem("products", stringStorage);
        localStorage.setItem("stringCart", cartStringify);
}
});