$("#searchButton").on("click", function(event){

	var song = $("#songField").val();
	var artist = $("#artistField").val();
	var songsReturned;
	var songID;
	var matchedSongs = [];


	$.ajax({
		url: "https://us-central1-ucb-musicon.cloudfunctions.net/spotify"
	})
	.done(function (token) {
		var spotifyApi = new SpotifyWebApi();
		spotifyApi.setAccessToken(token);
		
		spotifyApi.searchTracks(song)
			.then(function (data) {
				
				songsReturned = data.tracks.items;
				console.log('songsReturned', songsReturned);

				songsReturned.forEach(function(songReturned) {
					var artistName = songReturned.artists[0].name,
					songNAME = songReturned.name,
					songID = songReturned.id,
					album = songReturned.album.name,
					preview = songReturned.preview_url;

					if(artistName.toLowerCase() === artist.toLowerCase() && songNAME.toLowerCase() === song.toLowerCase()) {
						matchedSongs.push({name:artistName, song_name: songNAME ,songid:songID, album:album, preview:preview});
					}

				});

				
				var selectedSong = matchedSongs[0];
				console.log($("#player"));
				$("#player").attr("src",selectedSong.preview);
				console.log("Song URL", selectedSong.preview);

			}, function (err) {
				console.error(err);
			});

	});

});