$(document).ready(function(){

    //Nedan hämtar vår information från Local storage och skriver ut det på produktsidan

    let information = localStorage.getItem("products");
    let productInfo = JSON.parse(information);

    let prefix = "";
    if(window.location.href.indexOf("index.html") <= 0) {
        prefix = "../";
    }

    $("#product-img").append($("<img>").attr({"src": prefix + productInfo[0].picture, "class": "d-block w-100", "alt": productInfo[0].name + " perfume"}));

    $("#product-img-desktop").append($("<img>").attr({"src": prefix + productInfo[0].picture, "class": "d-block w-100", "alt": productInfo[0].name + " perfume"}));


    $("#product-name").append(productInfo[0].name);

    //Meddelande när produkt läggs till i varukorgen

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