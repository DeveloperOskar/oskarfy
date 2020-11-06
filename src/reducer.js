export const initialState = {
  user: null,
  token: null,
  playlists: [],
  playing: false,
  item: null,
  discover_weekly: null,
  currentlyPlaying: null,
  selectedPlaylist: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case 'SET_CURRENTLY_PLAYING':
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    case 'SET_SELECTED_PLAYLIST':
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    default:
      return state;
  }
};

export default reducer;
