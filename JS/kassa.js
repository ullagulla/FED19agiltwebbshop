$(document).ready(function(){

        $(".cart-prod-container").html("");

        let prefix = "";
        if(window.location.href.indexOf("index.html") <= 0) {
            prefix = "../";
        }

        let checkoutProducts = JSON.parse(localStorage.getItem("cart"));

        $.each(checkoutProducts, function(i){

            let checkoutContainer = $("<div>").attr({"class": "checkoutProd px-0 pb-4", "id": "checkoutProd"+i});
            let checkoutImgWrapper = $("<div>").attr({"class": "col-3 pic-wrapper pr-0 pl-2 pt-2", "id": "checkout-prod-div"+i});
            let checkoutRemove = $("<span>").attr({"class": "remove", "id": "remove"+i}).html("x");
            let checkoutImgContainer = $("<div>").addClass("pic-container");
            let checkoutImg = $("<img>").attr({"src": prefix + checkoutProducts[i].product.picture, "class": "d-block ml-1", "alt": checkoutProducts[0].product.name + " perfume"});
            let checkoutInfo = $("<div>").addClass("col-3 flex-column prod-wrapper d-inline-block pt-2 pl-0 pr-0");
            let checkoutNameWrapper = $("<div>").addClass("prod-name-wrapper");
            let checkoutName = $("<span>").attr({"class": "name mb-0", "id": "name" +i}).html(checkoutProducts[i].product.name);
            let checkoutTxt = $("<div>").addClass("perfume-txt-container");
            let perfumeTxt = $("<p>").addClass("perfume-txt");
            let checkoutSizeContainer = $("<div>").addClass("perfume-size-container");
            let checkoutSize = $("<p>").append($("<p>")).attr({"id": "size"}).html("50 ml");
            let checkoutPriceContainer = $("<div>").addClass("col-3 pt-3 pr-0 checkout-prod-price d-inline-block");
            let cartPrice = $("<p>").attr({"class": "text-right prod-price", "id": "price" +i}).html((checkoutProducts[i].product.smallprice)*(checkoutProducts[i].amount) + "  SEK");
            let checkoutQuantity = $("<div>").addClass("col-3 prod-wrapper px-0 d-inline-block");
            let quantityWrapper = $("<span>").addClass("inputs px-1 d-flex justify-content-center");
            let inputMinus = $("<input>").attr({"type": "button", "id": "button-minus"+i, "value": "-", "class": "button-minus btn pl-0 pr-1", "data-field": "quantity"});
            let inputValue = $("<input>").attr({"type": "number", "id": "number"+i, "step": 1, "max": "", "value": checkoutProducts[i].amount, "class": "quantity-field", "name": "quantity"});
            let inputPlus = $("<input>").attr({"type": "button", "id": "button-plus"+i, "value": "+", "class": "button-plus btn p-0 mr-2", "data-field": "quantity"});


            $(".order-container").append(checkoutContainer);
            checkoutContainer.append(checkoutImgWrapper, checkoutInfo, checkoutQuantity, checkoutPriceContainer);
            checkoutImgWrapper.append(checkoutRemove, checkoutImgContainer);
            checkoutImgContainer.append(checkoutImg); //funkar
            checkoutInfo.append(checkoutNameWrapper, checkoutTxt, checkoutSizeContainer);
            checkoutNameWrapper.append(checkoutName);
            checkoutTxt.append(perfumeTxt);
            checkoutSizeContainer.append(checkoutSize);
            checkoutPriceContainer.append(cartPrice);
            checkoutQuantity.append(quantityWrapper);
            quantityWrapper.append(inputMinus, inputValue, inputPlus);

        });

    //Nedan är kod för att man INTE kan klicka sig ur modalen utan att trycka på "continue shopping"-knappen

    $('#examplebtnModal').click(function(){
      $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    });

    //Nedan är en funktion som scrollar upp dig till toppen när man klickar på knappen med pilen upp

    $(".scroll-button").on("click", function(){
        var y = $(window).scrollTop();  //your current y position on the page
        $(window).scrollTop(0);
    });

    //Vid klick på att lägga till rabattkod så kommer input fältet visas

    $(".discount-code").on("click", function(){

        $(".discount-wrapper").slideToggle("fast");

    })

    //Vid klick på add-discount knappen så syns texten nedan 

    $(".discount-btn").on("click", function (){
        $(".invalid-code").slideToggle("fast");
    });

    //När man går vidare från att fylla i sina uppgifter så syns nästa div med betalningsuppgifter

    $(".form-wrapper").on("submit", function(e){

        e.preventDefault();

        let email = $('#inputEmail').val();
        let adress = $('#inputAddress').val();
        let firstname = $("#inputFirstname").val();
        let lastname = $("#inputLastname").val();
        let city = $('#inputCity').val();
        let zip = $('#inputZip').val();
        let phone = $("#inputPhone").val();

        $(".payment-container").addClass("d-flex").hide().slideDown("slow");
        $(".place-order-container").addClass("d-flex").hide().slideDown("slow");

    });

    //Om man inte vill betala med kort utan vill visa fler betalningsuppgifter så syns nedan div med Klarna

    $(".show-klarna").on("click", function(){

        $(".klarna-container").slideToggle("slow", function(){
            $(".klarna-container").toggleClass("d-flex d-none");
        });
        
    })

    //Random ordernummer

    $("#examplebtnModal").on("click", function(){
        let max = Math.floor(Math.random()* 10000000000)
        $("#result").html(max);
    })

  });