import Axios from 'axios'

function randomTrack(){
    let _this = this;

    //Request for a playlist via Soundcloud using a client id
    Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
        .then(function (response) {
            // Store the length of the tracks
            const trackLength = response.data.tracks.length;

            // Pick a random number
            const randomNumber = Math.floor((Math.random() * trackLength) + 1);

            // Set the track state with a random track from the playlist
            _this.setState({track: response.data.tracks[randomNumber]});
        })
        .catch(function (err) {
            // If something goes wrong, let us know
            console.log(err);
        });
}

function formatSongTime(ms) {
    // Format hours
    var hours = Math.floor(ms / 3600000);
    ms = ms % 3600000;

    // Format minutes
    var minutes = Math.floor(ms / 60000);
    ms = ms % 60000;

    // Format seconds
    var seconds = Math.floor(ms / 1000);
    ms = Math.floor(ms % 1000);

    // Return as string
    return (min < 10 ? '0' : '') + min + ':' +
    (sec < 10 ? '0' : '') + sec;
}

function getAlbumArt(url){
  return url.replace(/large/, 't500x500');
}

module.exports = {formatSongTime: formatSongTime, getAlbumArt:getAlbumArt}

