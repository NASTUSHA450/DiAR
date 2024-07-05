$(function () {
    $('.carousel.auto-stop-at-end ol').carousel({
        arrows: true,
        indicators: false,
        interval: 0,
        speed: 300,
        onComplete: function (e) {
            e.carousel('stop');
        }
    });
});
$(function () {
    $("#tabs").tabs();
});
$(function () {
    $("#tabs1").tabs();
});

$(document).ready(function () {
    $(".hoverli").hover(
  function () {
     $('ul.file_menu').slideDown('medium');
  }, 
  function () {
     $('ul.file_menu').slideUp('medium');
  }
);

     $(".file_menu li").hover(
  function () {
     $(this).children("ul").slideDown('medium');
  },
  function () {
    $(this).children("ul").slideUp('medium');
  }
);
});
$(document).ready(function () {
    $(".hoverli1").hover(
  function () {
     $('ul.file_menu1').slideDown('medium');
  }, 
  function () {
     $('ul.file_menu1').slideUp('medium');
  }
);

     $(".file_menu1 li").hover(
  function () {
     $(this).children("ul").slideDown('medium');
  },
  function () {
    $(this).children("ul").slideUp('medium');
  }
);
});


function goToByScroll(id){
  id = id.replace("Link", "");
  $('html,body').animate({
      scrollTop: $("#"+id).offset().top},
      'slow');
}

$("#info > a").click(function(e) { 
  e.preventDefault(); 
  goToByScroll($(this).attr("id"));           
});

$('img[data-enlargeable]').addClass('img-enlargeable').click(function() {
    var src = $(this).attr('src');
    var modal;
  
    function removeModal() {
      modal.remove();
      $('body').off('keyup.modal-close');
    }
    modal = $('<div>').css({
      background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
      backgroundSize: 'contain',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: '10000',
      top: '0',
      left: '0',
      cursor: 'zoom-out'
    }).click(function() {
      removeModal();
    }).appendTo('body');
    //handling ESC
    $('body').on('keyup.modal-close', function(e) {
      if (e.key === 'Escape') {
        removeModal();
      }
    });
  });