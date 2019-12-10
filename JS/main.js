$(document).ready(function(){

    //Funktion för sidemenu

    $(".openbtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    });

    $(".closebtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    })

    //Search field

    $(".search-glass").on("click", function(){
        $(".search-field").toggleClass("active");
    });

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

    $.each(products, function(i){

        $(".wrapper").append([
            $("<div>", {"class": "prod-wrapper col-12 col-md-6 col-lg-4"}).append([
                $("<div>", {"class": "prod-img my-3"}).append([
                    $("<a>", {"href": "html/produktsida.html"}).append([
                        $("<img>", {"src": products[i].picture, "alt": products[i].name + " perfume"})
                    ]),
                ]),
                $("<div>", {"class": "prod-info"}).append([
                    $("<p>", {"class": "prod-name"}).append(products[i].name),
                    $("<p>", {"class": "prod-price"}).append("From " + products[i].smallprice + " :-")
                ]),
                $("<div>", {"class": "prod-icons"}).append([
                    $("<img>", {"class": "heart-icon pr-1 pt-3", "src": "images/heart.PNG", "alt": "heart-icon", "id": "heart" +i}),
                    $("<img>", {"class": "cart-icon p1-1 pr-3 pt-3", "src": "images/cart.PNG", "alt": "cart-icon", "id": "cart" +i})
                ])
            ]),
        ]);

        //Nedan funktion höjer värdet på badge (varukorg) med 1

        $("#cart"+i).on("click", function(){

            cart.push(products[i]);
            $(".badge-icon").html(cart.length);

            $(".cart-notification").toggleClass("message-active");

        });

    });

});