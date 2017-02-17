//React library
import React from 'react';
import Axios from 'axios';

import {formatSongTime} from '../utils'

import Sound from 'react-sound';
import Display from '../components/Display';
import Player from '../components/Player';
import Progress from '../components/ProgressBar';

var Spotify = require('spotify-web-api-js');
var s = new Spotify();
var SpotifyPlayer = require('react-spotify-album-player');


class PlayerContainer extends React.Component {

  constructor(props) {
     super(props);
     this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
     this.state = {
       track: {
        stream_url: '', 
        title: '', 
        artwork_url: '',
       },
       albumArt: '',
       albumName: '',
       artist: '',
       playStatus: Sound.status.STOPPED,
       elapsed: '00:00',
       total: '',
       position: 0,
       songPosition: 0,
     };
   }

 componentDidMount() {
    this.getTrack();
 }

  // xlArtwork(url){
  //   return url.replace(/large/, 't500x500');
  // }

  togglePlay(){
    if(this.state.playStatus === Sound.status.PLAYING){
      this.setState({playStatus: Sound.status.PAUSED})
    } else {
      this.setState({playStatus: Sound.status.PLAYING})
    }
  }

  stop(){
   this.setState({playStatus: Sound.status.STOPPED});
  }

  forward(){
    this.setState({songPosition: this.state.songPosition+=1000*10});
  }

  backward(){
    this.setState({songPosition: this.state.songPosition-=1000*10});
  }

  handleSongFinished () {
    this.getTrack();
  }

  formatSongTime(ms) {
    // Format hours
    var hours = Math.floor(ms / 3600000);
    ms = ms % 3600000;

    // Format minutes
    var min = Math.floor(ms / 60000);
    ms = ms % 60000;

    // Format seconds
    var sec = Math.floor(ms / 1000);
    ms = Math.floor(ms % 1000);

    // Return as string
    return (min < 10 ? '0' : '') + min + ':' +
    (sec < 10 ? '0' : '') + sec;
  }

  handleSongPlaying(audio){
     this.setState({  
      elapsed: this.formatSongTime(audio.position),
      total: this.formatSongTime(audio.duration),
      position: audio.position / audio.duration })
   }


  //soundcloud
  prepareUrl(url) {
    return `${url}?client_id=${this.client_id}`
  }

  //soundcloud
  getRandomTrack(){
    let _this = this;
    Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
      .then(function (response) {
        const trackLength = response.data.tracks.length;
        const randomNumber = Math.floor((Math.random() * trackLength) + 1);
        _this.setState({track: response.data.tracks[randomNumber]});
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //spotify
  getTrack () {
    let _this = this;
    s.getAlbum('6SzWkXNgnjUNd4KKWNr3An')
      .then(res => {
        let artistName = res.label; let albumTitle = res.name; let albumUrl = res.href
        let albumArtUrl = res.images[0]; let tracks = res.tracks.items

        const trackLength = res.tracks.items.length;
        const randomNumber = Math.floor((Math.random() * trackLength) - 1);
        const randomTrack = res.tracks.items[randomNumber]
        this.setState({ albumArt: albumArtUrl, albumName: albumTitle, artist: artistName,
                        track: randomTrack, title: randomTrack.name, 
                        stream_url: randomTrack.href, total: randomTrack.duration_ms })
      })

  }

  render () {
    // const playerStyle = {
    //   width: '500px',
    //   height: '500px',
    //   backgroundImage: `linear-gradient(
    //   rgba(0, 0, 0, 0.7),
    //   rgba(0, 0, 0, 0.7)
    //   ), 
    //   url(${this.xlArtwork(this.state.albumArt)})
    //   `
    // }
    const playerStyle = {
      width: '600px',
      height: '600px',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
      )`
    }

    return (
      <div className="music_player" style={playerStyle}>
        <Display
          title={this.state.track.title}/>
        {/*<Sound
           url={this.prepareUrl(this.state.track.stream_url)}
           playStatus={this.state.playStatus}
           onPlaying={this.handleSongPlaying.bind(this)}
           playFromPosition={this.state.playFromPosition}
           onFinishedPlaying={this.handleSongFinished.bind(this)}/>*/}
        <SpotifyPlayer
          albumName={this.state.albumName}
          artistName={this.state.artist}
          onTrackPlayed={this.handleSongPlaying.bind(this)}
          onTrackStopped={this.handleSongPlaying.bind(this)} 
          />
        {/*<Player
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          playStatus={this.state.playStatus}
          forward={this.forward.bind(this)}
          backward={this.backward.bind(this)}
          random={this.getTrack.bind(this)}/>*/}
        <Progress
          elapsed={this.state.elapsed}
          total={this.state.total}
          position={this.state.position}/>
      </div>
    );
  }
}

export default PlayerContainer