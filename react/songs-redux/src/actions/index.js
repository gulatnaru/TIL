// Action Creator : 함수
// Action : object

export const selectSong = (song) => {
  return { // returns action
    type: 'SONG_SELECTED',
    payload: song
  }
};