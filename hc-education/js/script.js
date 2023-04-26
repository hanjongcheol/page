$(window).on('scroll load', function () {
	if ($(document).scrollTop() > 80) {
		$('#header').addClass('fixed');
	} else {
		$('#header').removeClass('fixed');
	}
});


var Wwidth = $(window).outerWidth();

$(window).on('resize load', function () {
	if($(window).width() > 1399){ 
		$('#header').removeClass('mobile-mode');
		$('#header').addClass('pc-mode');
	}
	else{
		$('#header').removeClass('pc-mode');
		$('#header').addClass('mobile-mode');
		$('.mobile-mode .active').show();
		$('#mask').hide();
    }
});

var ObjGnb = $(document);
		

ObjGnb.init(function(){
	$('#header .depth-02').prev('h2').addClass('has_depth');
	$('#header').after('<span id="mask"></span>');
})


.on({
	'click': function(e) { 
		e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('#footer .open').removeClass('active');
			} else{
				$(this).addClass('active');
			}
		}
}, '#footer .open')

.on({
	'click': function(e) { 
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$('.depth-02').stop().slideUp(100);
		} else{
			$('#header h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('.depth-02').stop().slideUp(100);
			$(this).parent('h2').next('.depth-02').stop().slideDown(100);
		}
	}
}, '#header.mobile-mode h2 a')
.on({
	'mouseover': function() {
		$('.depth-01 li , .depth-02').removeClass('active')
		$(this).children().addClass('active');
		$('#mask').addClass('active');
		$('.bg_pc , #mask').show();
		var highestBox = 0;
		$('#header .depth-02').each(function(){
				if($(this).height() > highestBox){
				highestBox = $(this).height() + 10; 
			}
			$('.bg_pc').css('height',highestBox); 
		});
	$('.bg_pc').on('mouseleave', function() {
		$('.depth-01 .active').removeClass('active')
		$('.bg_pc , #mask').hide();
	});
	}
}, '#header.pc-mode .depth-01 li')

.on({
	'mouseover': function(e) {
		e.stopPropagation();
	}
	
}, '#header.pc-mode .depth-01 h3 a')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('#header nav').toggleClass('active');
		$('#header').toggleClass('active');
	}
	
}, '#header.mobile-mode .sitemap, #header.mobile-mode .mobile-close');

$(function(){
	$('#btn-top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
		  scrollTop: 0
		}, 400);
	  }); 

	  var currentPosition = parseInt($("#btn-top").css("top"));
	  $(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		$("#btn-top").stop().animate({"top":posY+currentPosition+"px"},500);
		if ( posY > 100 ){
		  $("#btn-top").css('opacity','.8');
		} else if(posY < 100) {
		  $("#btn-top").css('opacity','0');
		};
	  });
});


var Wwidth = $(window).outerWidth();

$(window).on('resize', function() {
	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function(){
	var Wwidth2 = $(window).outerWidth();
	if ( (Wwidth > 1399 && Wwidth2 < 1400) || (Wwidth < 1400 && Wwidth2 > 1399) ){
		document.location.reload();	
	}
	}, 500);
});



