import { combineReducers } from 'redux';

const songsReducer = (action) => {
  return [
    { title: 'somebody to love', artist: 'Queen', duration: '5:10' },
    { title: 'black parade', artist: 'MCR', duration: '5:32'},
    { title: 'niggas in paris', artist: 'jay-z', duration: '3:42' },
    { title: 'power', artist: 'MCR', duration: '4:29'},
  ]
};

const selectedSongReducer = (selectedSong=null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  } else {
    return selectedSong;
  }
}

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});