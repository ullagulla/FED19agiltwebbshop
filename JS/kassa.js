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

    // $(window).scroll(function(){
    //     let sticky = $('.sticky'),
    //         scroll = $(window).scrollTop();
            
    //     if (scroll >= 70) sticky.addClass('fixed');
    //     else sticky.removeClass('fixed');
    // });

  });