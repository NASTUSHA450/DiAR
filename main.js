$(function () {
  $('.carousel.auto-stop-at-end ol').carousel({
    arrows: true,
    indicators: true,
    interval: 0,
    speed: 300,
    flexible: true,
    onComplete: function (e) {
      e.carousel('stop');
    }
  });
});
$(function () {
  $('.carousel.standard ol').carousel({
    arrows: true,
    speed: 800,
    flexible: true,
  });
});

// mobile menu
$("#burger").on("click", function () {
  $("#mobileMenu").toggleClass("open-menu");
  if ($('#mobileMenu').hasClass('open-menu')) {
    $("#burger").html(`<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 2L22 23" stroke="white" stroke-width="2"/>
<path d="M22 1L1 22" stroke="white" stroke-width="2"/>
</svg>`);
    $('body').addClass("fixed");

  } else {
    $("#burger").html(`<svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="1" x2="37" y2="1" stroke="white" stroke-width="2" stroke-linecap="round" />
                <line x1="11" y1="11" x2="37" y2="11" stroke="white" stroke-width="2" stroke-linecap="round" />
                <line x1="1" y1="21" x2="37" y2="21" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>`);
    $('body').removeClass("fixed");
  }
});

// submenu dropdown
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
// youtube modal
function Show() {
  $("#dialog:ui-dialog").dialog("destroy");

  $("#dialog-modal").dialog({
    height: 470,
    width: 550,
    modal: true
  });
}

// types tabs
$(function () {
  $("#tabs").tabs();
  $("#tabs1").tabs();
});



// scroll to #
function goToByScroll(id) {
  id = id.replace("Link", "");
  $('html,body').animate({
    scrollTop: $("#" + id).offset().top
  },
    'slow');
}

$("#info > a").click(function (e) {
  e.preventDefault();
  goToByScroll($(this).attr("id"));
});
$("#infoLink").click(function (e) {
  console.log('clicked')
  e.preventDefault();
  goToByScroll($(this).attr("id"));
});

// language switch
$(".language > a").click(function (e) {
  e.preventDefault();
  $(".language > a").toggleClass("active")
})

// enlarge image on click
$('img[data-enlargeable]').addClass('img-enlargeable').click(function () {
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
  }).click(function () {
    removeModal();
  }).appendTo('body');
  //handling ESC
  $('body').on('keyup.modal-close', function (e) {
    if (e.key === 'Escape') {
      removeModal();
    }
  });
});