
$("#searchButton").on("click", function(event) {
	var artist = $("#artistField").val();
	var song = $("#songField").val();
	var lyrics = ""
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
			console.log(lyrics);
			console.log(typeof lyrics);
			$("#lyrics").html(lyrics);
		});
	$("#first-page").css("display","none")
	$("#second-page").css("display","block")
	
});



