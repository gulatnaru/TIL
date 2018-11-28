import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends Component {
  render() {
    return (
      <div className="ui divided list">
        {this.renderList()}
      </div>
    )
  }

  renderList() {
    return this.props.songs.map(song => {
      return (
        <div key={song.title} className="item">
          <div className="content">
            {song.title}
          </div>

          <div className="right float content">
            <button 
              className="ui button primary"
              onClick={() => this.props.selectSong(song)}
            >
              Select
            </button>
          </div>
        </div>
      );
    })
  }
}

const mapStateToProps = (state) => {
  console.log(state); // state 변화마다 재 실행
  return {
    songs: state.songs
  }
}

export default connect(
  mapStateToProps,
  { selectSong }
  )(SongList);