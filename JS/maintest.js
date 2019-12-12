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

        $(".prod-container").append([
            $("<div>", {"class": "prod-wrapper col-6 col-md-4 col-lg-4 pb-4"}).append([
                $("<div>", {"class": "hover-div", "id": "hover" +i}).append([
                    $("<div>", {"class": "prod-img pb-3 pb-md-0"}).append([
                        $("<img>", {"src": products[i].picture, "alt": products[i].name + " perfume", "id": "pic"+i})
                    ]),
                    $("<div>", {"class": "prod-info", "id": "info"+i}).append([
                        $("<p>", {"class": "prod-name mb-0 pl-3 pt-3"}).append(products[i].name),
                        $("<p>", {"class": "prod-price mb-0 pl-3"}).append("From " + products[i].smallprice + " :-")
                    ]),
                    $("<div>", {"class": "icons-hover d-flex", "id": "icons-hover" +i}).append([
                        $("<img>", {"class": "prod-heart pr-1", "src": "images/heart-white.PNG", "id": "hover-heart" +i}),
                        $("<img>", {"class": "prod-cart pl-1", "src": "images/cart-white.PNG", "id": "hover-cart" +i})
                    ]),
                    $("<div>", {"class": "prod-icons pr-1 pb-1"}).append([
                        $("<img>", {"class": "heart-icon pr-1 pt-3", "src": "images/heart.PNG", "alt": "heart-icon", "id": "heart" +i}),
                        $("<img>", {"class": "cart-icon p1-1 pr-3 pt-3", "src": "images/cart.PNG", "alt": "cart-icon", "id": "cart" +i})
                    ])
                ]),
            ]),
        ]);

        //Nedan visar info PÅ produkt-bilderna vid hover desktop

        if ($(window).width() > 990) {

            $("#hover"+i).on("mouseover", function(){

                $("#info"+i).css({
                    opacity: "1",
                    transition: "all 0.5s"
                })

                $("#icons-hover" +i).css({
                    opacity: "1",
                    transition: "all 0.5s"
                })

            });

            $("#hover"+i).on("mouseleave", function(){

                $("#info"+i).css({
                    opacity: "0",
                    transition: "all 0.5s"
                })

                $("#icons-hover" +i).css({
                    opacity: "0",
                    transition: "all 0.5s"
                })

            });

        }

        else {
            $("#info"+i).css("opacity", "1");

            $("#icons-hover" +i).css("visibility", "hidden");
        }

        //meddelande när produkt läggs i varukorgen

        $("#cart0").on("click", function(){

            $(".cart-notification").toggleClass("message-active");
    
        });

        $(".hover-div").on("click", function(){

            storage.push(products[i]);
            putInStorage();
            location.href = "html/produktsida.html";

            console.log(storage);

        });

        //Nedan funktion höjer värdet på badge (varukorg) med 1 samt sparar objekt vi klickar på I LOCAL STORAGE

        $("#cart"+i).on("click", function(){

            amount[products[i].name] += 1;
            cart.push(products[i]);
            putInStorage();
            let babo = localStorage.getItem("stringCart");
            let boba = JSON.parse(babo);
            $(".badge-icon").text(boba.length);

            console.log(amount);

            // cart.push(products[i]);
            // $(".badge-icon").html(cart.length);

            $(".cart-notification").toggleClass("message-active");

        });

    });

    $.each(products, function(i){

        $(".lp-prod-wrapper").append([
            $("<div>", {"class": "prod-container col-6 col-md-4 col-lg-4 pb-4"}).append([
                $("<div>", {"class": "hover-div", "id": "hover" +i}).append([
                    $("<div>", {"class": "prod-img pb-3 pb-lg-0"}).append([
                        $("<img>", {"src": "../" + products[i].picture, "alt": products[i].name + " perfume", "id": "pic"+i})
                    ]),
                    $("<div>", {"class": "prod-info", "id": "info"+i}).append([
                        $("<p>", {"class": "prod-name mb-0 pl-3 pt-3"}).append(products[i].name),
                        $("<p>", {"class": "prod-price mb-0 pl-3"}).append("From " + products[i].smallprice + " :-")
                    ]),
                    $("<div>", {"class": "icons-hover d-flex", "id": "icons-hover" +i}).append([
                        $("<img>", {"class": "prod-heart pr-1", "src": "../images/heart-white.PNG", "id": "hover-heart" +i}),
                        $("<img>", {"class": "prod-cart pl-1", "src": "../images/cart-white.PNG", "id": "hover-cart" +i})
                    ]),
                    $("<div>", {"class": "prod-icons pr-1 pb-1"}).append([
                        $("<img>", {"class": "heart-icon pr-1 pt-3", "src": "../images/heart.PNG", "alt": "heart-icon", "id": "heart" +i}),
                        $("<img>", {"class": "cart-icon p1-1 pr-3 pt-3", "src": "../images/cart.PNG", "alt": "cart-icon", "id": "cart" +i})
                    ])
                ]),
            ]),
        ]);
    });

    function putInStorage() {
            let stringStorage = JSON.stringify(storage);
            let cartStringify = JSON.stringify(cart);
            localStorage.clear("product");
            localStorage.setItem("product", stringStorage);
            localStorage.setItem("stringCart", cartStringify);
    }
    
        //Nedan funktion höjer värdet på badge (varukorg) med 1
    
        $("#cart0").on("click", function(){
    
            $(".cart-notification").toggleClass("message-active");
    
        });
    
        // Chat modal
    
        $(".open-button").on("click", function(){
            $("#myForm").css("display", "block");
        }) 
    
        $(".cancel").on("click", function(){
            $("#myForm").css("display", "none");
        }) 

});