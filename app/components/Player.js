import React from 'react';
import ClassNames from 'classnames';

class Player extends React.Component {

  render(){
    const play_pause = ClassNames({
      'ion-play': this.props.playStatus == 'PLAYING' ? false : true,
      'ion-pause': this.props.playStatus == 'PLAYING' ? true : false
    });

    return(
      <div className="player">
        <div className="player__backward">
          <button onClick={this.props.backward}><i className="ion-skip-backward"></i></button>
        </div>
        <div className="player__main">
          <button onClick={this.props.togglePlay}><i className={play_pause}></i></button>
          <button onClick={this.props.stop}><i className="ion-stop"></i></button>
          <button onClick={this.props.random}><i className="ion-shuffle"></i></button>
        </div>
        <div className="player__forward">
          <button onClick={this.props.forward}><i className="ion-skip-forward"></i></button>
        </div>
      </div>
    )
  }

}

export default Player