let showplay = true;
let initialtimer = false;
let wentfullscreen = false;
let starttime;
let detectTap;

function loadGallery() {
	if ($(".timerwrapper img").hasClass("2")) {
		showplay = false;
	}

	starttime = new Date();
	if (typeof window.history.pushState == 'function') {
		let url = window.location.href;
		//window.history.replaceState({}, document.title, url.split("?")[0]);
	}
	$(".bx-pager").click();
	window.to = setTimeout(function () {
		$(".bx-pager").addClass("makevisible");
		if (isMobileDevice()) {
			$(".playwrapper").addClass("topleft");
			if (!$(".playwrapper").is(":visible")) {
				$(".playwrapper").fadeIn(200);
			}
		} else {
			if (!showplay) {
				initialtimer = true;
				setTimer(2);
			}
		}
		if (!wentfullscreen) {
			//requestFullscreen();
		}
	}, 500);

	$(document).keydown(function (e) {
		setTimer(0);
		if (e.which === 27) { // escape
			window.location.href = "/";
			return;
		}

		let c = "";

		if (e.which === 37) { // left
			c = ".bx-prev";
		} else if (e.which === 39) { // right
			c = ".bx-next";
		}

		if (c !== "") {
			let allowed = true;
			$("#gallery article").each(function (e) {
				let op = $(this).css("opacity");
				if (op !== 1) {
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

		let prefix = $(".timerwrapper img").attr('src').split("/timer/")[0] + "/timer/";
		if (time > 0) {
			$(".timerwrapper img").attr('src', prefix + time + "timer.png");
			window.gtimer = setInterval(function () {
				let pc = $(".bx-pager").html().split("/");
				$(".bx-next").click();
				if (pc[0] === pc[1]) {
					setTimer(0);
					$(".playwrapper").fadeIn(200);
				}
			}, time * 1000);
		} else {
			initialtimer = false;
			$(".timerwrapper img").attr('src', prefix + "notimer.png");
		}
	}

// Click events
	$(document).on('touchstart', function () {
		detectTap = true;
	});
	$(document).on('touchmove', function () {
		detectTap = false;
	});
	$(document).on('click touchend', function (e) {
		window.scrollTo(0, 0);
		if (!wentfullscreen) {
			checkFullscreen();
		}

		if (showplay || isMobileDevice()) {
			let pc = $(".bx-pager").html().split("/");
			if (pc[0] === 1) {
				if (!$(".playwrapper").is(":visible")) {
					$(".playwrapper").fadeIn(200);
				}
			} else {
				if ($(".playwrapper").is(":visible")) {
					$(".playwrapper").fadeOut(200);
				}
			}
		}

		if ($(e.target).is("img") || $(e.target).is("button")) {
			return;
		}

		if (Math.round((new Date() - starttime) / 1000) < 2) {
			return;
		}
		if ((e.screenX && e.screenX !== 0 && e.screenY && e.screenY !== 0) || (detectTap && e.type === "touchend")) {
			setTimer(0);
		}
	});

	function checkFullscreen() {
		if (!isMobileDevice()) {
			wentfullscreen = true;
			return;
		}
		let elm = document.documentElement;
		let rfs = elm.requestFullScreen || elm.webkitRequestFullScreen || elm.mozRequestFullScreen;
		rfs.call(elm);
	}

	$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (e) {
		wentfullscreen = true;
	});

	$(".playwrapper img").on('click', function (e) {
		$(".playwrapper").fadeOut(200);
		el.goToSlide(1);
		setTimer(3);
	});
	$(".rewindwrapper img").on('click', function (e) {
		window.location.href = "/";
	});
	$(".timerwrapper img").on('click', function (e) {
		let src = $(this).attr('src');
		let prefix = src.split("/timer/")[0] + "/timer/";
		let suffix = ".png";

		if (initialtimer) {
			$(this).attr('src', prefix + "notimer" + suffix);
			setTimer(0);
			initialtimer = false;
			return;
		}

		switch (src) {
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
	$(".timerwrapper img").on('contextmenu', function (e) {
		let src = $(this).attr('src');
		let prefix = src.split("/timer/")[0] + "/timer/";
		let suffix = ".png";

		initialtimer = false;
		e.preventDefault();

		switch (src) {
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
}

let images = [];
function preloadImages() {
	let imageurls = $("#images").html().split(",");
	for (let i = 0; i < imageurls.length; i++) {
		if (imageurls[i]) {
			images[i] = new Image();
			images[i].src = imageurls[i];
		}
	}
}

function isMobileDevice() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}