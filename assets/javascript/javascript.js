$(document).ready(function () {
	$("#searchButton").on("click", function (event) {
		var artist = $("#artistField").val();
		var song = $("#songField").val();
		var lyrics = "";
		console.log(artist);
		console.log(song);

		$.ajax({
			type: "GET",
			data: {
				apikey: "e610c624a7b5be5fd2d8ae7bb22b1d52",
				q_track: song,
				q_artist: artist,
				format: "jsonp",
				callback: "callback"
			},
			url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
			dataType: "jsonp",
			jsonpCallback: 'callback',
			contentType: 'application/json',
		}).done(function (response) {
			lyrics = response.message.body.lyrics.lyrics_body;
			lyricsSplit = lyrics.split("...")
			lyricsClean = lyricsSplit[0];
			console.log(lyricsClean);
			$("#lyrics").html(lyricsClean);
		});
		$("#first-page").css("display", "none");
		$("#second-page").css("display", "block");
		$("div.controls").css("display", "block");
	});


	// Click logo to reset search
	$("#logo").on("click", function(event){
		event.preventDefault();
		location.reload();
	});

	// Click search icon to reset search
	$(".fa-search").on("click", function(event){
		event.preventDefault();
		location.reload();
	});

	// Click play to play audio element
	$(".fa-play").on("click", function(event){
		event.preventDefault();
		var player = $("#player")[0];
		player.play();
	});

	// Click stop to pause and reset time on audio element
	$(".fa-stop").on("click", function(event){
		event.preventDefault();
		var player = $("#player")[0];
		player.pause();
		player.currentTime = 0;
	});

	// Open Spotify in a new window
	$(".fa-spotify").on("click", function(event){
		event.preventDefault();
		var url = $(this).attr("src");
		console.log("SRC", url);
		window.open(url);
	});

});