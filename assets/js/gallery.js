var showplay = true;
var initialtimer = false;
var wentfullscreen = false;
var starttime;
var detectTap;

$(document).ready(function(e) {
	preloadImages();

	if ($(".timerwrapper img").hasClass("3")) {
		showplay = false;
	}

	starttime = new Date();
	if(typeof window.history.pushState == 'function') {
		var url = window.location.href;
		window.history.replaceState({}, document.title, url.split("?")[0]);
	}
	$(".bx-pager").click();
	window.to = setTimeout(function(){ 
		$(".bx-pager").addClass("makevisible");
		if (isMobileDevice()) {
			$ (".playwrapper").addClass("topleft");
			if (!$(".playwrapper").is(":visible")) {
				$(".playwrapper").fadeIn(200);
			}
		}
		else {
			if (!showplay) {
				initialtimer = true;
				setTimer(3);
			}
		}
		if (!wentfullscreen) {
			document.requestFullscreen();
		}
	}, 500);
});

$(document).keydown(function(e) {
	setTimer(0);
	if (e.which == 27) { // escape
		window.location.href = "/";
		return;
	}

	var c = "";

	if (e.which == 37) { // left
		c = ".bx-prev";
	}
	else if (e.which == 39) { // right
		c = ".bx-next";
	}

	if (c != "") {
		var allowed = true;
		$("#gallery article").each(function(e) {
			var op = $(this).css("opacity");
			if (op != 1) {
				allowed = false;
				return true;
			}
		});
		if (allowed) {
			$(c).click();
		}
	}
});

function setTimer(time) {
	clearInterval(window.gtimer);

	var prefix = $(".timerwrapper img").attr('src').split("/timer/")[0] + "/timer/";
	if (time > 0) {
		$(".timerwrapper img").attr('src', prefix + time + "timer.png");
		window.gtimer = setInterval(function(){ 
			var pc = $(".bx-pager").html().split("/");
			$(".bx-next").click();
			if (pc[0] == pc[1]) {
				setTimer(0);
				$(".playwrapper").fadeIn(200);
			}
		}, time * 1000);
	}
	else {
		initialtimer = false;
		$(".timerwrapper img").attr('src', prefix + "notimer.png");
	}
}

// Click events
$(document).on('touchstart', function() {
	detectTap = true;
});
$(document).on('touchmove', function() {
	detectTap = false;
});
$(document).on('click touchend', function(e) {
	window.scrollTo(0,0);
	if (!wentfullscreen) {
		checkFullscreen();
	}

	if (showplay || isMobileDevice()) {
		var pc = $(".bx-pager").html().split("/");
		if (pc[0] == 1) {
			if (!$(".playwrapper").is(":visible")) {
				$(".playwrapper").fadeIn(200);
			}
		}
		else {
			if ($(".playwrapper").is(":visible")) {
				$(".playwrapper").fadeOut(200);
			}
		}
	}

	if($(e.target).is("img") || $(e.target).is("button")) {
		return;
	}

	if (Math.round((new Date() - starttime) / 1000) < 2) {
		return;
	}
	if ((e.screenX && e.screenX != 0 && e.screenY && e.screenY != 0) || (detectTap && e.type == "touchend")) {
		setTimer(0);
	}
});

function checkFullscreen() {
	if (!isMobileDevice()) {
		wentfullscreen = true;
		return;
	}
	var elm = document.documentElement;
	var rfs = elm.requestFullScreen || elm.webkitRequestFullScreen || elm.mozRequestFullScreen;
	rfs.call(elm);
}
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function(e) {
	wentfullscreen = true;
});

$(".playwrapper img").on('click', function(e) {
	$(".playwrapper").fadeOut(200);
	el.goToSlide(1);
	setTimer(3);
});
$(".rewindwrapper img").on('click', function(e) {
	window.location.href = "/#album";
});
$(".timerwrapper img").on('click', function(e) {
	var src = $(this).attr('src');
	var prefix = src.split("/timer/")[0] + "/timer/";
	var suffix = ".png";

	if (initialtimer) {
		$(this).attr('src', prefix + "notimer" + suffix);
		setTimer(0);
		initialtimer = false;
		return;
	}
	
	switch(src) {
		case prefix + "notimer" + suffix:
			setTimer(1);
			break;
		case prefix + "1timer" + suffix:
			setTimer(2);
			break;
		case prefix + "2timer" + suffix:
			setTimer(3);
			break;
		case prefix + "3timer" + suffix:
			setTimer(5);
			break;
		default:
			setTimer(0);
			break;
	}
});
$(".timerwrapper img").on('contextmenu', function(e) {
	var src = $(this).attr('src');
	var prefix = src.split("/timer/")[0] + "/timer/";
	var suffix = ".png";

	initialtimer = false;
	e.preventDefault();

	switch(src) {
		case prefix + "notimer" + suffix:
			setTimer(5);
			break;
		case prefix + "1timer" + suffix:
			setTimer(0);
			break;
		case prefix + "2timer" + suffix:
			setTimer(1);
			break;
		case prefix + "3timer" + suffix:
			setTimer(2);
			break;
		default:
			setTimer(3);
			break;
	}
});

var images = [];
function preloadImages() {
	var imageurls = $("#images").html().split(",");
	for (var i = 0; i < imageurls.length; i++) {
		if (imageurls[i]) {
			images[i] = new Image();
			images[i].src = imageurls[i];
		}
	}
}

function isMobileDevice() {
	return $("#ismobile").html() == "yes";
}