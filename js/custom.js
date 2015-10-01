"use strict";

$('ul.slimmenu').slimmenu({
    resizeWidth: '992',
    collapserTitle: 'Main Menu',
    animSpeed: 250,
    indentChildren: true,
    childrenIndenter: ''
});


// Countdown
$('.countdown').each(function() {
    var count = $(this);
    $(this).countdown({
        zeroCallback: function(options) {
            var newDate = new Date(),
                newDate = newDate.setHours(newDate.getHours() + 130);

            $(count).attr("data-countdown", newDate);
            $(count).countdown({
                unixFormat: true
            });
        }
    });
});


$('.btn').button();

$("[rel='tooltip']").tooltip();

$('.form-group').each(function() {
    var self = $(this),
        input = self.find('input');

    input.focus(function() {
        self.addClass('form-group-focus');
    })

    input.blur(function() {
        if (input.val()) {
            self.addClass('form-group-filled');
        } else {
            self.removeClass('form-group-filled');
        }
        self.removeClass('form-group-focus');
    });
});

$('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 3,
    limit: 8
}, {
    source: function(q, cb) {
        return $.ajax({
            dataType: 'json',
            type: 'get',
            url: 'http://gd.geobytes.com/AutoCompleteCity?callback=?&q=' + q,
            chache: false,
            success: function(data) {
                var result = [];
                $.each(data, function(index, val) {
                    result.push({
                        value: val
                    });
                });
                cb(result);
            }
        });
    }
});


$('input.date-pick, .input-daterange, .date-pick-inline').datepicker({
    todayHighlight: true
});



$('input.date-pick, .input-daterange input[name="start"]').datepicker('setDate', 'today');
$('.input-daterange input[name="end"]').datepicker('setDate', '+7d');

$('input.time-pick').timepicker({
    minuteStep: 15,
    showInpunts: false
})

$('input.date-pick-years').datepicker({
    startView: 2
});




$('.booking-item-price-calc .checkbox label').click(function() {
    var checkbox = $(this).find('input'),
        // checked = $(checkboxDiv).hasClass('checked'),
        checked = $(checkbox).prop('checked'),
        price = parseInt($(this).find('span.pull-right').html().replace('$', '')),
        eqPrice = $('#car-equipment-total'),
        tPrice = $('#car-total'),
        eqPriceInt = parseInt(eqPrice.attr('data-value')),
        tPriceInt = parseInt(tPrice.attr('data-value')),
        value,
        animateInt = function(val, el, plus) {
            value = function() {
                if (plus) {
                    return el.attr('data-value', val + price);
                } else {
                    return el.attr('data-value', val - price);
                }
            };
            return $({
                val: val
            }).animate({
                val: parseInt(value().attr('data-value'))
            }, {
                duration: 500,
                easing: 'swing',
                step: function() {
                    if (plus) {
                        el.text(Math.ceil(this.val));
                    } else {
                        el.text(Math.floor(this.val));
                    }
                }
            });
        };
		
    if (!checked) {
        animateInt(eqPriceInt, eqPrice, true);
        animateInt(tPriceInt, tPrice, true);
    } else {
        animateInt(eqPriceInt, eqPrice, false);
        animateInt(tPriceInt, tPrice, false);
    }
});


$('div.bg-parallax').each(function() {
    var $obj = $(this);
    if($(window).width() > 992 ){
        $(window).scroll(function() {
            var animSpeed;
            if ($obj.hasClass('bg-blur')) {
                animSpeed = 10;
            } else {
                animSpeed = 15;
            }
            var yPos = -($(window).scrollTop() / animSpeed);
            var bgpos = '50% ' + yPos + 'px';
            $obj.css('background-position', bgpos);

        });
    }
});



$(document).ready(
    function() {

    $('html').niceScroll({
        cursorcolor: "#000",
        cursorborder: "0px solid #fff",
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        cursorwidth: "10px",
        cursorborderradius: "0px",
        cursoropacitymin: 0.2,
        cursoropacitymax: 0.8,
        boxzoom: true,
        horizrailenabled: false,
        zindex: 9999
    });


        // Owl Carousel
        var owlCarousel = $('#owl-carousel'),
            owlItems = owlCarousel.attr('data-items'),
            owlCarouselSlider = $('#owl-carousel-slider'),
            owlNav = owlCarouselSlider.attr('data-nav');
        // owlSliderPagination = owlCarouselSlider.attr('data-pagination');

        owlCarousel.owlCarousel({
            items: owlItems,
            navigation: true,
            navigationText: ['', '']
        });

        owlCarouselSlider.owlCarousel({
            slideSpeed: 300,
            paginationSpeed: 400,
            // pagination: owlSliderPagination,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            transitionStyle: 'fade',
            autoPlay: 4500
        });


    // footer always on bottom
    var docHeight = $(window).height();
   var footerHeight = $('#main-footer').height();
   var footerTop = $('#main-footer').position().top + footerHeight;
   
   if (footerTop < docHeight) {
    $('#main-footer').css('margin-top', (docHeight - footerTop) + 'px');
   }
    }


);


$('.nav-drop').dropit();


$("#price-slider").ionRangeSlider({
    min: 130,
    max: 575,
    type: 'double',
    prefix: "$",
    // maxPostfix: "+",
    prettify: false,
    hasGrid: true
});

$('.i-check, .i-radio').iCheck({
    checkboxClass: 'i-check',
    radioClass: 'i-radio'
});



$('.booking-item-review-expand').click(function(event) {
    console.log('baz');
    var parent = $(this).parent('.booking-item-review-content');
    if (parent.hasClass('expanded')) {
        parent.removeClass('expanded');
    } else {
        parent.addClass('expanded');
    }
});


$('.stats-list-select > li > .booking-item-rating-stars > li').each(function() {
    var list = $(this).parent(),
        listItems = list.children(),
        itemIndex = $(this).index();

    $(this).hover(function() {
        for (var i = 0; i < listItems.length; i++) {
            if (i <= itemIndex) {
                $(listItems[i]).addClass('hovered');
            } else {
                break;
            }
        };
        $(this).click(function() {
            for (var i = 0; i < listItems.length; i++) {
                if (i <= itemIndex) {
                    $(listItems[i]).addClass('selected');
                } else {
                    $(listItems[i]).removeClass('selected');
                }
            };
        });
    }, function() {
        listItems.removeClass('hovered');
    });
});



$('.booking-item-container').children('.booking-item').click(function(event) {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().removeClass('active');
    } else {
        $(this).addClass('active');
        $(this).parent().addClass('active');
        $(this).delay(1500).queue(function() {
            $(this).addClass('viewed')
        });
    }
});


$('.form-group-cc-number input').payment('formatCardNumber');
$('.form-group-cc-date input').payment('formatCardExpiry');
$('.form-group-cc-cvc input').payment('formatCardCVC');




if ($('#map-canvas').length) {
	
	 var map,map1,map2,map3,
        service,service1,service2,service3;

    jQuery(function($) {
        $(document).ready(function() {
            var latlng = new google.maps.LatLng(40.7564971, -73.9743277);
			var latlng1 = new google.maps.LatLng(40.7564971, -73.9743277);
			var latlng2 = new google.maps.LatLng(40.7564971, -73.9743277);
			var latlng3 = new google.maps.LatLng(40.7564971, -73.9743277);
            var myOptions = {
                zoom: 15,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
			var myOptions1 = {
                zoom: 15,
                center: latlng1,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
			var myOptions2 = {
                zoom: 15,
                center: latlng2,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
			var myOptions3 = {
                zoom: 15,
                center: latlng3,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            map1 = new google.maps.Map(document.getElementById("map-canvas1"), myOptions1);
            map2 = new google.maps.Map(document.getElementById("map-canvas2"), myOptions2);
            map3 = new google.maps.Map(document.getElementById("map-canvas3"), myOptions3);


            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            marker.setMap(map);
			var marker1 = new google.maps.Marker({
                position: latlng1,
                map: map1
            });
            marker1.setMap(map1);
			var marker2 = new google.maps.Marker({
                position: latlng2,
                map: map2
            });
            marker2.setMap(map2);
			var marker3 = new google.maps.Marker({
                position: latlng3,
                map: map3
            });
            marker3.setMap(map3);
 var request = {
    location: latlng,
    radius: '1000',
    types: ['hospital','pharmacy']
  };
 
 var request1 = {
    location: latlng1,
    radius: '1000',
    types: ['hospital','pharmacy']
  }; 
  
  var request2 = {
    location: latlng2,
    radius: '1000',
    types: ['hospital','pharmacy']
  }; 
  
  var request3 = {
    location: latlng3,
    radius: '1000',
    types: ['hospital','pharmacy']
  };
  
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
            $('a[href="#google-map-tab"]').on('shown.bs.tab', function(e) {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(latlng);
            });

	  service1 = new google.maps.places.PlacesService(map1);
  service1.nearbySearch(request1, callback1);
            $('a[href="#google-map-tab1"]').on('shown.bs.tab', function(e) {
                google.maps.event.trigger(map1, 'resize');
                map1.setCenter(latlng1);
            });

	  service2 = new google.maps.places.PlacesService(map2);
  service2.nearbySearch(request2, callback2);
            $('a[href="#google-map-tab2"]').on('shown.bs.tab', function(e) {
                google.maps.event.trigger(map2, 'resize');
                map2.setCenter(latlng2);
            });

	  service3 = new google.maps.places.PlacesService(map3);
  service3.nearbySearch(request3, callback3);
            $('a[href="#google-map-tab3"]').on('shown.bs.tab', function(e) {
                google.maps.event.trigger(map3, 'resize');
                map3.setCenter(latlng3);
            });
        });
    });
	
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
       createMarker(results[i],map);
    }
  }
}

function callback1(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
       createMarker(results[i],map1);
    }
  }
}
function callback2(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
       createMarker(results[i],map2);
    }
  }
}
function callback3(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
       createMarker(results[i],map3);
    }
  }
}

function createMarker(place,map) {
  var placeLoc = place.geometry.location;
  var h=false;
  
  for(var i=0; i<place.types.length;i++)
  {
	  if(place.types[i].toLowerCase()=='hospital')
	  { h=!h; break;}
  }
  var marker;
  if(h)
   marker= new google.maps.Marker({
    map: map,
    position: place.geometry.location,
	icon:'img/H.png',
	title:place.name
});
else
 marker= new google.maps.Marker({
    map: map,
    position: place.geometry.location,
	icon:'img/images (1).png',
	title:place.name
});

  // google.maps.event.addListener(marker, 'move', function() {
	  // $(this).attr('title',place.name);
    // // infowindow.open(map, this);
    // // infowindow.setContent(place.name);
    // // infowindow.open(map, this);
  // });
}
	
	
	//changed by saimadhan mohan
	
	


  // google.maps.event.addListener(marker, 'move', function() {
	  // $(this).attr('title',place.name);
    // // infowindow.open(map, this);
    // // infowindow.setContent(place.name);
    // // infowindow.open(map, this);
  // });

	
	
    // var map,
        // service;

    // jQuery(function($) {
        // $(document).ready(function() {
            // var latlng = new google.maps.LatLng(40.7564971, -73.9743277);
            // var myOptions = {
                // zoom: 15,
                // center: latlng,
                // mapTypeId: google.maps.MapTypeId.ROADMAP,
                // scrollwheel: false
            // };

            // map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);


            // var marker = new google.maps.Marker({
                // position: latlng,
                // map: map
            // });
            // marker.setMap(map);
 // var request = {
    // location: latlng,
    // radius: '1000',
    // types: ['school']
  // };

  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);

            // $('a[href="#google-map-tab"]').on('shown.bs.tab', function(e) {
                // google.maps.event.trigger(map, 'resize');
                // map.setCenter(latlng);
            // });
        // });
    // });
// }
// function callback(results, status) {
  // if (status == google.maps.places.PlacesServiceStatus.OK) {
    // for (var i = 0; i < results.length; i++) {
      // var place = results[i];
      // // createMarker(results[i]);
    // }
  // }
// }

// function createMarker(place) {
  // var placeLoc = place.geometry.location;
  // var marker = new google.maps.Marker({
    // map: map,
    // position: place.geometry.location
// });}

$('.card-select > li').click(function() {
    self = this;
    $(self).addClass('card-item-selected');
    $(self).siblings('li').removeClass('card-item-selected');
    $('.form-group-cc-number input').click(function() {
        $(self).removeClass('card-item-selected');
    });
});
// Lighbox gallery
$('#popup-gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a.popup-gallery-image',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});

// Lighbox image
$('.popup-image').magnificPopup({
    type: 'image'
});

// Lighbox text
$('.popup-text').magnificPopup({
    removalDelay: 500,
    closeBtnInside: true,
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true
});

// Lightbox iframe
$('.popup-iframe').magnificPopup({
    dispableOn: 700,
    type: 'iframe',
    removalDelay: 160,
    mainClass: 'mfp-fade',
    preloader: false
});


$('.form-group-select-plus').each(function() {
    var self = $(this),
        btnGroup = self.find('.btn-group').first(),
        select = self.find('select');
    btnGroup.children('label').last().click(function() {
        btnGroup.addClass('hidden');
        select.removeClass('hidden');
    });
});
// Responsive videos
$(document).ready(function() {
    $("body").fitVids();
});

$(function($) {
    $("#twitter").tweet({
        username: "remtsoy", //!paste here your twitter username!
        count: 3
    });
});

$(function($) {
    $("#twitter-ticker").tweet({
        username: "remtsoy", //!paste here your twitter username!
        page: 1,
        count: 20
    });
});

$(document).ready(function() {
    var ul = $('#twitter-ticker').find(".tweet-list");
    var ticker = function() {
        setTimeout(function() {
            ul.find('li:first').animate({
                marginTop: '-4.7em'
            }, 850, function() {
                $(this).detach().appendTo(ul).removeAttr('style');
            });
            ticker();
        }, 5000);
    };
    ticker();
});
$(function() {
    $('#ri-grid').gridrotator({
        rows: 4,
        columns: 8,
        animType: 'random',
        animSpeed: 1200,
        interval: 1200,
        step: 'random',
        preventClick: false,
        maxStep: 2,
        w992: {
            rows: 5,
            columns: 4
        },
        w768: {
            rows: 6,
            columns: 3
        },
        w480: {
            rows: 8,
            columns: 3
        },
        w320: {
            rows: 5,
            columns: 4
        },
        w240: {
            rows: 6,
            columns: 4
        }
    });

});


$(function() {
    $('#ri-grid-no-animation').gridrotator({
        rows: 4,
        columns: 8,
        slideshow: false,
        w1024: {
            rows: 4,
            columns: 6
        },
        w768: {
            rows: 3,
            columns: 3
        },
        w480: {
            rows: 4,
            columns: 4
        },
        w320: {
            rows: 5,
            columns: 4
        },
        w240: {
            rows: 6,
            columns: 4
        }
    });

});

var tid = setInterval(tagline_vertical_slide, 2500);

// vertical slide
function tagline_vertical_slide() {
    var curr = $("#tagline ul li.active");
    curr.removeClass("active").addClass("vs-out");
    setTimeout(function() {
        curr.removeClass("vs-out");
    }, 500);

    var nextTag = curr.next('li');
    if (!nextTag.length) {
        nextTag = $("#tagline ul li").first();
    }
    nextTag.addClass("active");
}

function abortTimer() { // to be called when you want to stop the timer
    clearInterval(tid);
}