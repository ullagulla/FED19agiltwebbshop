$(document).ready(function () {

    //Funktion för sticky top

    let storage = [];

    $(window).scroll(function () {
        let sticky = $('.sticky'),
            scroll = $(window).scrollTop();

        if (scroll >= 70) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
    });

    //Funktion för sidemenu

    $(".openbtn").on("click", function (e) {
        e.stopPropagation();
        $(".sidenav").toggleClass("active");

    });

    $(".closebtn").on("click", function () {

        $(".sidenav").toggleClass("active");

    })

    $('.sidenav').click(function (e) {
        e.stopPropagation();
    });

    $('body,html').click(function (e) {
        $('.sidenav').removeClass('active');
    });

    //Search field

    $(".search-glass").on("click", function () {
        $(".search-field").toggleClass("active");
    });


    $(".toggle-cart").on("click", function (e) {
        e.stopPropagation();
        $(".cartnav").toggleClass("cart-active");

    })

    //Funktion för varukorg

    $('.cartnav').click(function (e) {
        e.stopPropagation();
    });

    $('body,html').click(function (e) {
        $('.cartnav').removeClass('cart-active');
    });


    // funktion för att skicka vidare produkter till varukorg

    let information = localStorage.getItem("stringCart");
    let productInfo = JSON.parse(information);

    let prefix = "";
    if (window.location.href.indexOf("index.html") >= 0) {
        prefix = "../";
    }

});