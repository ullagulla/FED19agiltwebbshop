$(document).ready(function(){

    //Funktion för sidemenu

    $(".openbtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    });

    $(".closebtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    })

    let information = localStorage.getItem("product");
    let productInfo = JSON.parse(information);

    console.log("../" + productInfo[0].picture);

    $("#product-img").append($("<img>").attr({"src": "../" + productInfo[0].picture, "class": "d-block w-100", "alt": productInfo[0].name + " perfume"}));

    $("#product-name").append(productInfo[0].name);

    //Nedan funktion höjer värdet på badge (varukorg) med 1

    $("#cart0").on("click", function(){

        $(".cart-notification").toggleClass("message-active");

    });

    // Chat modal

    function openForm() {
        document.getElementById("myForm").style.display = "block";
      }
      
      function closeForm() {
        document.getElementById("myForm").style.display = "none";
      }

});