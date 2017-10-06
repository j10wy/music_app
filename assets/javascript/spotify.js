$("#searchButton").on("click", function (event) {

	var song = $("#songField").val();
	var artist = $("#artistField").val();
	var songsReturned;
	var songID;
	var matchedSongs = [];

	// Log the name of the artist and song entered in the search field
	console.log("SONG ON CLICK", song);
	console.log("ARTIST ON CLICK", artist);

	$.ajax({
			url: "https://us-central1-ucb-musicon.cloudfunctions.net/spotify"
		})
		.done(function (token) {
			// Setup the spotify access token
			var spotifyApi = new SpotifyWebApi();
			spotifyApi.setAccessToken(token);

			// Search tracks takes a song as a param. Pass the song name to the searchTracks method. We check for the artist name when we loop through the results below.
			spotifyApi.searchTracks(song)
				.then(function (data) {

					songsReturned = data.tracks.items;
					console.log("All the data", data);
					console.log('songsReturned', songsReturned);

					// Loop through each item to determine the song we need
					songsReturned.forEach(function (songReturned) {
						artistName = songReturned.artists[0].name;
						songNAME = songReturned.name;
						songID = songReturned.id;
						album = songReturned.album.name;
						albumImage = songReturned.album.images[0].url;
						preview = songReturned.preview_url;
						spotifyURL = songReturned.external_urls.spotify;

						// Build an object of the Spotify data we need for each track
						if (artistName.toLowerCase() === artist.toLowerCase() && songNAME.toLowerCase() === song.toLowerCase()) {
							matchedSongs.push({
								name: artistName,
								song_name: songNAME,
								songid: songID,
								album: album,
								albumImage: albumImage,
								preview: preview,
								spotifyURL: spotifyURL
							});
						}

					});

					// Select the first song in the new array of objects
					var selectedSong = matchedSongs[0];
					
					// attach the mp3 and the spotify link
					$("#player").attr("src", selectedSong.preview);
					$(".fa-spotify").attr("src", selectedSong.spotifyURL);
					$("#song-title").text(selectedSong.name + " - " +selectedSong.song_name);

					// attach the image and artist information to the page
					imgDisplayed = matchedSongs[0].albumImage;
					albumNameDisplayed = matchedSongs[0].album;
					$("#albumImg").attr("src", imgDisplayed);
					$("#album-name").html(albumNameDisplayed);

				}, function (err) {
					console.error(err);
				});

		});

});