$(document).ready(function(){

    //Funktion för sidemenu

    $(".openbtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    });

    $(".closebtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    })

    $.each(stringCart, function(i){

        $(".active").append($("<img>"), {"src": stringCart[i].picture, "alt": stringCart[i].name + " perfume", "id": "pic" +i})

        $("pic"+i).on("click", function(){

            storage.push(products[i]);
            putInStorage();
            location.href = "produktsida.html";

            console.log(theStorage);

        });

        //Nedan funktion höjer värdet på badge (varukorg) med 1

        $("#cart"+i).on("click", function(){

            // cart.push(products[i]);
            // $(".badge-icon").html(cart.length);

            $(".cart-notification").toggleClass("message-active");

        });

    });


});