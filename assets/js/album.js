$(document).ready(function(e) {
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);

	let album = urlParams.get('album');
	let title = urlParams.get('title');

	$(document).attr("title", "IkFocus | " + title);

	setupImages();
	loadGallery();
});

function setupImages(album) {
	let galleryhtml = "";

	let albumRootUrl = "https://ikfocus.com/photos/" + album + "/";

	let hasDescription = false;
	if (urlExists(albumRootUrl + "description.txt")) {
		hasDescription = true;

		galleryhtml += '<article><figure>';
		galleryhtml += '<p class="centeredtext"><span id="albumdescription"></span></p>';
		galleryhtml += '</figure></article>';
	}

	let n = 0;
	while(urlExists(albumRootUrl + n + ".jpg")) {


		n+=1;
	}

	$("#gallery").html(galleryhtml);

	if (hasDescription) {
		$.ajax({
			url: albumRootUrl + "description.txt",
			type: "GET",
			dataType: 'text',
			success: function(data){
				$("#albumdescription").html("<p>" + data.replaceAll("\n", "<br>") + "</p>");
			},
			error: function(data) { }
		});
	}
}

function urlExists(imageUrl){
    let http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
}