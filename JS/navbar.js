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

    let prefix = "";
    if(window.location.href.indexOf("index.html") < 0) {
        prefix = "../";
    }

    $(".img-cart").append($("<img>").attr({"src":prefix + productInfo[0].picture, "class": "ml-2", "alt": productInfo[0].name + " perfume"}));

    $("#name").text(productInfo[0].name);

    $("#price").text(productInfo[0].smallprice + ".00 kr");

    //Nedan gör det möjligt att ta bort en produkt i varukorgen

    // let removeCartItemButtons = $(".removebtn");

    // for (let i = 0; i < removeCartItemButtons.length; i++) {
    //     var button = removeCartItemButtons[i];

    //     button.addEventListener("click", function(event){
    //         let buttonClicked = event.target
    //         buttonClicked.parentElement.parentElement.remove();
    //     })
        
    // }

    // $.forEach(removeCartItemButtons, function() {
    //     let button = removeCartItemButtons[i];
    //     button.on("click", function(){

    //         var buttonClicked = event.target
    //         buttonClicked.parentElement.parentElement.remove();
    //     })
    // });

});