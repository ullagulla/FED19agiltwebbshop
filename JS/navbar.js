$(document).ready(function(){

    //Funktion för sticky top

    let storage = [];

    $(window).scroll(function(){
        let sticky = $('.sticky'),
            scroll = $(window).scrollTop();
            
        if (scroll >= 70) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
        });
    
        //Funktion för sidemenu
    
        $(".openbtn").on("click", function(e){
    
            $(".sidenav").toggleClass("active");
            
        });
    
        $(".closebtn").on("click", function(){
    
            $(".sidenav").toggleClass("active");
    
        })
    
        //Search field
    
        $(".search-glass").on("click", function(){
            $(".search-field").toggleClass("active");
        });
    
    
        $(".toggle-cart").on("click", function(){
    
            $(".cartnav").toggleClass("cart-active");
    
        })
  

       // funktion för att skicka vidare produkter till varukorg

    let information = localStorage.getItem("stringCart");
    let productInfo = JSON.parse(information);

    let prefix = "";
    if(window.location.href.indexOf("index.html") >= 0) {
        prefix = "../";
    }

    $(".img-cart").on("click", function(){
        console.log("HualIgNNNN");
        storage.push(productInfo[i]);
        localStorage.clear("productFromCart");
        localStorage.setItem("productFromCart", storage);
        location.href = "produktsida.html";


    });

});

