$(document).ready(function(e) {
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);

	let album = urlParams.get('album');
	let title = urlParams.get('title');

	$(document).attr("title", "IkFocus | " + title);

	setupImages(album);
});

function setupImages(album) {
	let albumRootUrl = "photos/" + album + "/";

	$.ajax({
		url: "https://api.github.com/repos/inekekok/ikfocus.com/contents/photos/" + album,
		type: "GET",
		dataType: 'json',
		success: function(data){
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
					galleryhtml += '<img src="/' + albumRootUrl + fobj["name"] + '" alt="image">';
					galleryhtml += '</figure></article>';
				}
			}

			$("#gallery").html(galleryhtml);

			if (hasDescription) {
				$.ajax({
					url: albumRootUrl + "description.txt",
					type: "GET",
					dataType: 'text',
					success: function(data){
						$("#albumdescription").html("<p>" + data.replaceAll("\n", "<br>") + "</p>");

						loadGallery();
					},
					error: function(data) { }
				});
			}
			else {
				loadGallery();
			}
		},
		error: function(data) { }
	});
}

function urlExists(imageUrl){
    let http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
}