$(document).ready(function(e) {
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);

	let index = urlParams.get('i');
	let title = urlParams.get('title');
	let album = index + "-" + title;

	$(document).attr("title", "IkFocus | " + title);

	setupImages(album);
});

function setupImages(album) {
	$.ajax({
		url: "https://api.github.com/repos/inekekok/ikfocus.com/contents/photos/" + album,
		type: "GET",
		dataType: 'json',
		success: function(data) {
			data.sort(function(a, b) {
				return parseFloat(a.name) - parseFloat(b.name);
			});

			let galleryhtml = "";

			let hasDescription = false;
			for (let key in data) {
				let fobj = data[key];

				if ("name" in fobj) {
					if (fobj["name"] === "description.txt") {
						hasDescription = true;

						galleryhtml += '<article><figure>';
						galleryhtml += '<p class="centeredtext"><span id="albumdescription"></span></p>';
						galleryhtml += '</figure></article>';
					}
				}
			}

			for (let key in data) {
				let fobj = data[key];
				if ("name" in fobj) {
					if (fobj["name"] === "description.txt") {
						continue;
					}

					galleryhtml += '<article><figure>';
					galleryhtml += '<img src="/photos/' + album + '/' + fobj["name"] + '" alt="image">';
					galleryhtml += '</figure></article>';
				}
			}

			$("#gallery").html(galleryhtml);

			if (hasDescription) {
				$.ajax({
					url: "https://ikfocus.com/photos/" + album + "/description.txt",
					type: "GET",
					dataType: 'text',
					success: function(descdata) {
						$("#albumdescription").html("<p>" + descdata.replaceAll("\n", "<br>") + "</p>");
					},
					error: function(data) { }
				});
			}

			$.getScript('/assets/js/jquery.bxslider.js');
			$.getScript('/assets/js/head.js');
			$.getScript('/assets/js/mobile.js');
			$.getScript('/assets/js/app.js');
			$.getScript('/assets/js/pleaserotate.min.js');


			function loadGalleryAfterDelay(){
				loadGallery();
			}
			window.setTimeout(loadGalleryAfterDelay, 200);
		},
		error: function(data) { }
	});
}