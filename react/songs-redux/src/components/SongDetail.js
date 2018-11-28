import React from 'react'
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  return (
    <div>
      {renderSongDetail(song)}
    </div>
  )
}

const renderSongDetail = (song) => {
  if(!song) {
    return <div>Selct a song!</div>
  } else {
    return (
      <div>
        <h3>Detail: </h3>
        <h4>Title: {song.title}</h4>
        <h4>Artist: {song.artist}</h4>
        <p>Duration: {song.duration}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { song: state.selectedSong };
}

export default connect(mapStateToProps)(SongDetail);