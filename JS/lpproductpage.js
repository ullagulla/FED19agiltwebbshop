$(document).ready(function(){

    //Funktion för sidemenu

    $(".openbtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    });

    $(".closebtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    })

    //Klass med alla egenskaper för våra objekt som finns längre ned

    function Product(n, sp, lp, pic) {

        this.name = n;
        this.smallprice = sp;
        this.largeprice = lp;
        this.picture = pic;
    
    }

    //Våra objekt

    let prod1 = new Product("Super Cedar", 1200, 1850, "../images/serenity-supercedar.jpg");

    let prod2 = new Product("Sunday Cologne", 1200, 1850, "../images/serenity-sundaycologne.jpg");

    let prod3 = new Product("Bibliothèque", 1200, 1850, "../images/serenity-bibliotheque.jpg");

    let prod4 = new Product("Bal d'Afrique", 1200, 1850, "../images/serenity-baldafrique.jpg");  

    let prod5 = new Product("Blanche", 1200, 1850, "../images/serenity-blanche.jpg");  
    
    let prod6 = new Product("La Tulipe", 1200, 1850, "../images/serenity-latulipe.jpg");
    
    let prod7 = new Product("Sundazed", 1200, 1850, "../images/serenity-sundazed.jpg");

    let prod8 = new Product("Rose of No Man's Land", 1200, 1850, "../images/serenity-roseofnomansland.jpg");

    let prod9 = new Product("Pulp", 1200, 1850, "../images/serenity-pulp.jpg");

    let products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9];

    //Nedan loopar igenom alla våra objekt och skapar upp dom i html

    $(products).each(function(i){

        $(".wrapper").append([
            $("<div>", {"class": "prod-container col-6 col-md-4 col-lg-4 pb-4"}).append([
                $("<a>", {"href": "produktsida.html"}).append([
                    $("<div>", {"class": "hover-div", "id": "hover" +i}).append([
                        $("<div>", {"class": "prod-img pb-3 pb-lg-0"}).append([
                            $("<img>", {"src": products[i].picture, "alt": products[i].name + " perfume", "id": "pic"+i})
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
            ]),
        ]);

        if ($(window).width() > 990) {

            $("#hover"+i).hover(function(){

                $("#info"+i).css({
                    opacity: "1",
                    transition: "all 0.5s"
                })

                $("#icons-hover" +i).css({
                    opacity: "1",
                    transition: "all 0.5s"
                })

                return false

            });

            // $("#hover"+i).on("mouseleave", function(){

            //     $("#info"+i).css({
            //         opacity: "0",
            //         transition: "all 0.5s"
            //     })

            //     $("#icons-hover" +i).css({
            //         opacity: "0",
            //         transition: "all 0.5s"
            //     })

            // });

        }

        else {
            $("#info"+i).css("opacity", "1");

            $(".div-hover").css("visibility", "hidden");

        }

        return false

    });
});