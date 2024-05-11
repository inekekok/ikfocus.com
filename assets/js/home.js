$(document).ready(function(e) {
	let header = $("#welcome header");

	header.css('padding-top', (($(window).height()/2)-header.height()/2) + 'px');
	header.fadeIn(2500);
	if (window.location.hash) {
		$('html, body').animate({scrollTop:$("#welcome").height()}, 'slow');
		window.history.replaceState({}, document.title, "/");
	}

	loadProfileDescription();
	loadPortfolio();
});
$(window).on("resize", function(e) {
	let header = $("#welcome header");

	header.css('padding-top', (($(window).height()/2)-header.height()/2) + 'px');
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
		url: "/photos/-profile/description.txt",
		type: "GET",
		dataType: 'text',
		success: function(data){
			$("#profiledesc").html("<p>" + data.replaceAll("\n", "</p><p>") + "</p>");
		},
		error: function(data) { }
	});
}

function loadPortfolio() {
	$.ajax({
		url: "https://api.github.com/repos/inekekok/ikfocus.com/contents/photos",
		type: "GET",
		dataType: 'json',
		success: function(data){
			let portfoliohtml = "";

			for (let key in data) {
				let fobj = data[key];
				if ("name" in fobj) {
					let folder = fobj["name"];
					if (folder.startsWith("-")) {
						continue;
					}

					let title = folder.split("-")[1];

					folder = folder.replaceAll(" ", "%20");
					let rawtitle = folder.split("-")[1];

					portfoliohtml += '<article href="/album?album=' + folder + '&title=' + rawtitle + '">';
					portfoliohtml += '<header><h3>' + title + '</h3><p></p></header>';
					portfoliohtml += '<figure style="background-image: url(/photos/' + folder + '/0.jpg);"></figure>';
					portfoliohtml += '</article>';
				}
			}

			$("#portfolio").html(portfoliohtml);

			$("#portfolio article").on('click', function(e) {
				window.location.href = $(this).attr('href');
			});
		},
		error: function(data) { }
	});
}