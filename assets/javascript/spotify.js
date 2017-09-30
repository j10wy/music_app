var song = "Billie Jean";
var artist = "Michael Jackson";
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
					artistName = songReturned.artists[0].name;
					songID = songReturned.artists[0].id;

					// console.log("ARTIST",artistName);	
					// console.log("ID",songID);	
					

					if(artistName === artist) {
						matchedSongs.push({name:artistName, songid:songID});
					}

				});

				console.log(matchedSongs);

			}, function (err) {
				console.error(err);
			});





	});