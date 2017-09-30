$.ajax({
		url: "https://us-central1-ucb-musicon.cloudfunctions.net/spotify"
	})
	.done(function (token) {
		var spotifyApi = new SpotifyWebApi();
		spotifyApi.setAccessToken(token);

		spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
			if (err) console.error(err);
			else console.log('Artist albums', data);
		});
		
	});