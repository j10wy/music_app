const functions = require('firebase-functions');
var request = require('request'); // "Request" library
var client_id = 'f8148b6599904798a6df461ee469c1e8'; // Your client id
var client_secret = 'cfb191024d79450a9733fe0bed8fd993';
 // Your secret
const cors = require('cors')({
	origin: true
});
/*
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 * https://firebase.google.com/docs/functions/write-firebase-functions
 * 
 */

// your application requests authorization
var authOptions = {
	url: 'https://accounts.spotify.com/api/token',
	headers: {
		'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
	},
	form: {
		grant_type: 'client_credentials'
	},
	json: true
};

exports.spotify = functions.https.onRequest((req, res) => {

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			// use the access token to access the Spotify Web API
			var token = body.access_token;
			res.set('Access-Control-Allow-Origin', '*')
				.set('Access-Control-Allow-Methods', 'GET, POST')
			res.send(token);
		}
	});

});