$(document).ready(function(){

    //Funktion för sidemenu

    $(".openbtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    });

    $(".closebtn").on("click", function(){

        $(".sidenav").toggleClass("active");

    })

        // Varukorgen
        $(".cart-icon").on("click", function(){

            $(".cartnav").toggleClass("cart-active");
    
        });
    
        $(".cartbtn").on("click", function(){
    
            $(".cartnav").toggleClass("cart-active");
    
        })

    //Nedan hämtar vår information från Local storage och skriver ut det på produktsidan

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

    $(".open-button").on("click", function(){
        $("#myForm").css("display", "block");
    }) 

    $(".cancel").on("click", function(){
        $("#myForm").css("display", "none");
    }) 

        // Check if element is scrolled into view
        function isScrolledIntoView(elem) {
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();
      
          var elemTop = $(elem).offset().top;
          var elemBottom = elemTop + $(elem).height();
      
          return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
        // If element is scrolled into view, fade it in
        $(window).scroll(function() {
          $('.scroll-animations .animated').each(function() {
            if (isScrolledIntoView(this) === true) {
              $(this).addClass('fadeInLeft');
            }
          });
        });

});