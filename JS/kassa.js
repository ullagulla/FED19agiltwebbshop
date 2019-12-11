$(document).ready(function(){


    $('#examplebtnModal').click(function(){
      $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    });

    $(".scroll-button").on("click", function(){
        var y = $(window).scrollTop();  //your current y position on the page
        $(window).scrollTop(0);
    });

    $(".continue").on("click", function(){

        $(".payment-container").addClass("d-flex").slideDown("slow");

    });

  });