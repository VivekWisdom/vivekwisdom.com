/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/




jQuery(document).ready(
  function($) {

    new WOW().init();
    $('body').panelSnap({
      menu: $('header .nav'),
      panelSelector: '.snap',
      menuSelector: 'a',
      directionThreshold: 30,
      easing: 'swing',
    });

    if ($(window).width() <= 960) {
      $('body').panelSnap('disable');
    }
    /*----------------------------------------------------*/
    /*
     * FitText Settings
     * ------------------------------------------------------
     */

    setTimeout(function() {
      $('h1.responsive-headline').fitText(1, {
        minFontSize: '40px',
        maxFontSize: '90px'
      });
    }, 100);

    /*----------------------------------------------------*/
    /*
     * gmaps settings
     * ------------------------------------------------------
     */

    var map;

    // main directions 12.9713578,77.7119696,16z
    map = new GMaps({
      el: '#map',
      lat: 12.9713578,
      lng: 77.7119696,
      zoom: 4,
      zoomControl: true,
      zoomControlOpt: {
        style: 'SMALL',
        position: 'TOP_LEFT'
      },
      panControl: false,
      scrollwheel: false
    });

    // map.drawOverlay({
    //   lat: map.getCenter().lat(),
    //   lng: map.getCenter().lng(),
    //   content: '<i class="fa fa-map-marker fa-2"></i>',
    //   verticalAlign: 'top',
    //   horizontalAlign: 'center'
    // });

    // The styles below present a simplified map.
    // If you would like to use a normal coloured map, then please
    // remove or comment the code below, from lines 128 to 148.
    var mapStyles = [{
      featureType: "road",
      elementType: "geometry",
      stylers: [{
        lightness: 100
      }, {
        visibility: "simplified"
      }]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [{
        visibility: "off"
      }]
    }];

    // map.setOptions({
    //   styles: mapStyles
    // });

    map.addMarker({
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
      title: 'Bangalore',
      infoWindow: {
        content: '<p>I currently work here</p>'
      }
    });
    map.addMarker({
      lat: 26.848623,
      lng: 80.8024272,
      title: 'Lucknow',
      infoWindow: {
        content: '<p>My Hometown</p>'
      }
    });
    map.addMarker({
      lat: 13.0478572,
      lng: 80.0689236,
      title: 'Chennai',
      infoWindow: {
        content: '<p>Visited for Traveling</p>'
      }
    });
    map.addMarker({
      lat: 23.1996633,
      lng: 77.2658039,
      title: 'Bhopal',
      infoWindow: {
        content: '<p>Visited for Traveling</p>'
      }
    });
    map.addMarker({
      lat: 11.4119347,
      lng: 76.658469,
      title: 'Ooty',
      infoWindow: {
        content: '<p>Visited Queen of hill stations for travel</p>'
      }
    });
    map.addMarker({
      lat: 12.3108046,
      lng: 76.5656489,
      title: 'Mysore',
      infoWindow: {
        content: '<p>Visited Mysore Palace for travel</p>'
      }
    });
    /*----------------------------------------------------*/
    /*26.848623,80.8024272, 13.0478572,80.0689236, 23.1996633,77.2658039,11.4119347,76.658469
     * Smooth Scrolling, 12.3108046,76.5656489
     * ------------------------------------------------------
     */

    $('.smoothscroll').on('click', function(e) {
      //  e.preventDefault();

      var target = this.hash;
      $target = $(target);
      var $root = $('html, body');
      $root.stop().animate({
        'scrollTop': $target.offset().top
      }, 800, 'swing', function() {
        window.location.hash = target;
      });
    });

    /*----------------------------------------------------*/
    /*
     * Highlight the current section in the navigation bar
     * ------------------------------------------------------
     */

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({

      handler: function(event, direction) {

        var active_section;

        active_section = $(this);
        if (direction === "up")
          active_section = active_section.prev();

        var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");

      },
      offset: '35%'

    });

    /*----------------------------------------------------*/
    /*
     * Make sure that #header-background-image height is /* equal to the
     * browser height.
     * ------------------------------------------------------
     */

    $('header').css({
      'height': $(window).height()
    });
    $(window).on('resize', function() {

      $('header').css({
        'height': $(window).height()
      });
      $('body').css({
        'width': $(window).width()
      })
    });

    /*----------------------------------------------------*/
    /*
     * Fade In/Out Primary Navigation
     * ------------------------------------------------------
     */

    $(window).on(
      'scroll',
      function() {

        var h = $('header').height();
        var y = $(window).scrollTop();
        var nav = $('#nav-wrap');

        if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
          nav.fadeOut('fast');
        } else {
          if (y < h * .20) {
            nav.removeClass('opaque').fadeIn('fast');
          } else {
            nav.addClass('opaque').fadeIn('fast');
          }
        }

      });

    /*----------------------------------------------------*/
    /*
     * Modal Popup
     * ------------------------------------------------------
     */

    $('.item-wrap a').magnificPopup({

      type: 'inline',
      fixedContentPos: false,
      removalDelay: 200,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
      e.preventDefault();
      $.magnificPopup.close();
    });

    /*----------------------------------------------------*/
    /*
     * contact form
     * ------------------------------------------------------
     */

    // $('form#contactForm button.submit').click(
    //   function() {
    //
    //     $('#image-loader').fadeIn();
    //
    //     var contactName = $('#contactForm #contactName').val();
    //     var contactEmail = $('#contactForm #contactEmail')
    //       .val();
    //     var contactSubject = $('#contactForm #contactSubject')
    //       .val();
    //     var contactMessage = $('#contactForm #contactMessage')
    //       .val();
    //
    //     var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail + '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;
    //
    //     $.ajax({
    //
    //       type: "POST",
    //       url: "inc/sendEmail.php",
    //       data: data,
    //       success: function(msg) {
    //
    //         // Message was sent
    //         if (msg == 'OK') {
    //           $('#image-loader').fadeOut();
    //           $('#message-warning').hide();
    //           $('#contactForm').fadeOut();
    //           $('#message-success').fadeIn();
    //         }
    //         // There was an error
    //         else {
    //           $('#image-loader').fadeOut();
    //           $('#message-warning').html(msg);
    //           $('#message-warning').fadeIn();
    //         }
    //       }
    //     });
    //     return false;
    //   });

  });
