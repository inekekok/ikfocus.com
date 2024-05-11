$(document).ready(function(e) {
	let header = $("#welcome header");

	header.css('padding-top', (($(window).height()/2)-header.height()/2) + 'px');
	header.fadeIn(2500);
	if (window.location.hash) {
		$('html, body').animate({scrollTop:$("#welcome").height()}, 'slow');
		window.history.replaceState({}, document.title, "/");
	}

	loadProfileDescription();
});
$(window).on("resize", function(e) {
	let header = $("#welcome header");

	header.css('padding-top', (($(window).height()/2)-header.height()/2) + 'px');
});
$("#portfolio article").on('click', function(e) {
	window.location.href = $(this).attr('href');
});
$("button.b").on('click', function(e) {
	let buttontext = $(this).html();

	if (buttontext === "Meer informatie") {
		$("#portfolio").fadeOut(200);
		$(".moreinformation").fadeIn(200);
		$('html, body').animate({scrollTop:$("#welcome").height()}, 'slow');
		$(this).html("Foto's");
	}
	else {
		hideInfo();
		$(this).html("Meer informatie");
	}
});
$(".moreinformation .subp").on('click', function(e) {
	hideInfo();
	$("button.b").html("Meer informatie");
});
function hideInfo() {
	$(".moreinformation").fadeOut(200);
	$("#portfolio").fadeIn(200);
	$('html, body').animate({scrollTop:$("#welcome").height()}, 'slow');
}

function loadProfileDescription() {
	$.ajax({
		url: "/_Photos/_profile/description.txt",
		type: "GET",
		dataType: 'text',
		success: function(data){
			$("#profiledesc").html("<p>" + data.replaceAll("\n", "</p><p>") + "</p>");
		},
		error: function(data) { }
	});
}