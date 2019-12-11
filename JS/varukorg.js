$(document).ready(function(){

    let information = localStorage.getItem("product");
    let productInfo = JSON.parse(information);

    $(".img-cart").append($("<img>").attr({"src": productInfo[0].picture, "class": "ml-2", "alt": productInfo[0].name + " perfume"}));

    $("#name").text(productInfo[0].name);

    $("#price").text(productInfo[0].smallprice + ".00 kr");

});