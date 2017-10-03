

$("#searchButton").on("click", function(event){

	var song = $("#songField").val();
	var artist = $("#artistField").val();
	var songsReturned;
	var songID;
	var matchedSongs = [];

	console.log("SONG ON CLICK",song);
	console.log("ARTIST ON CLICK",artist);


	$.ajax({
		url: "https://us-central1-ucb-musicon.cloudfunctions.net/spotify"
	})
	.done(function (token) {
		var spotifyApi = new SpotifyWebApi();
		spotifyApi.setAccessToken(token);
		console.log("SONG ON CLICK",song);
	

		spotifyApi.searchTracks(song)
			.then(function (data) {
				
				songsReturned = data.tracks.items;
				console.log('songsReturned', songsReturned);

				songsReturned.forEach(function(songReturned) {
					artistName = songReturned.artists[0].name;
					songNAME = songReturned.name;
					songID = songReturned.id;
					album = songReturned.album.name;
					
				

					// console.log("SONG 2",song);
					// console.log("ARTIST 2",artist);
					

					if(artistName.toLowerCase() === artist.toLowerCase() && songNAME.toLowerCase() === song.toLowerCase()) {
						matchedSongs.push({name:artistName, song_name: songNAME ,songid:songID, album:album});
					}

				});

				console.log(matchedSongs);

			}, function (err) {
				console.error(err);
			});

	});

});

