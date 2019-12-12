$(document).ready(function(){

    //Funktion för sticky top

    $(window).scroll(function(){
        let sticky = $('.sticky'),
            scroll = $(window).scrollTop();
            
        if (scroll >= 70) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
        });
    
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
    
        // Varukorgen
        $(".cart-icon").on("click", function(){
    
            $(".cartnav").toggleClass("cart-active");
    
        });
    
        $(".cartbtn").on("click", function(){
    
            $(".cartnav").toggleClass("cart-active");
    
        })

        //funktion för att skicka vidare produkter till varukorg

    let information = localStorage.getItem("product");
    let productInfo = JSON.parse(information);

    $(".img-cart").append($("<img>").attr({"src": productInfo[0].picture, "class": "ml-2", "alt": productInfo[0].name + " perfume"}));

    $("#name").text(productInfo[0].name);

    $("#price").text(productInfo[0].smallprice + ".00 kr");

});