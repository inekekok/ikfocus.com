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
	let n = 0;
	while(imageExists("")) {

	}
}

function imageExists(imageUrl){
    let http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status !== 404;
}