$(document).ready(function(){

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

        if ($(".discount-wrapper").is(":hidden")){
            $(".invalid-code").hide();
        }
    })

    //Vid klick på add-discount knappen så syns texten nedan 

    $(".discount-btn").on("click", function (){
        $(".invalid-code").html("<small>The code is not valid, please try again <i class='fas fa-heart'></i></small>");
    });

    //När man går vidare från att fylla i sina uppgifter så syns nästa div med betalningsuppgifter

    $(".form-wrapper").on("submit", function(e){

        e.preventDefault();

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