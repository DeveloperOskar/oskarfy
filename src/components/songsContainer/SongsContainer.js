import React from 'react';
import './songsContainer.css';
import { useStateProvidervalue } from '../../StateProvider';
import SongRow from '../songrow/SongRow';
import SpotifyWebApi from 'spotify-web-api-js';
const SongsContainer = () => {
  const [
    { discover_weekly, selectedPlaylist },
    dispatch,
  ] = useStateProvidervalue();
  const spotify = new SpotifyWebApi();

  if (selectedPlaylist) {
    const getAllTracks = async () => {
      console.log(selectedPlaylist.id);
      let currentPlaylistOffset = 0;
      let currentSetOfPlaylistTracks = await spotify.getPlaylistTracks(
        selectedPlaylist.id,
        {
          offset: currentPlaylistOffset,
        }
      );
      let allTracks = currentSetOfPlaylistTracks;
      currentPlaylistOffset += 100;
      //gets all users playlists
      while (currentSetOfPlaylistTracks.next) {
        console.log('LOG 1');
        currentSetOfPlaylistTracks = await spotify.getPlaylistTracks(
          selectedPlaylist.id,
          {
            offset: currentPlaylistOffset,
          }
        );
        currentPlaylistOffset += 100;
        allTracks.items = [
          ...allTracks.items,
          ...currentSetOfPlaylistTracks.items,
        ];
      }
      console.log('selected', selectedPlaylist);
      console.log('all track collected', allTracks);
      selectedPlaylist.tracks.items = [...allTracks.items];
      console.log(
        'all track collected in first array',
        selectedPlaylist.tracks.items
      );
      dispatch({
        type: 'SET_SELECTED_PLAYLIST',
        selectedPlaylist: selectedPlaylist,
      });
    };
    if (
      selectedPlaylist?.tracks.next &&
      selectedPlaylist.tracks.total !== selectedPlaylist.tracks.items.length
    ) {
      getAllTracks();
    }
    return (
      <div className='songsContainer'>
        {selectedPlaylist?.tracks.items.map((track, i) => {
          return <SongRow key={track + i} track={track.track} number={i} />;
        })}
      </div>
    );
  } else {
    return (
      <div className='songsContainer'>
        {discover_weekly?.tracks.items.map((track, i) => {
          return <SongRow key={track + i} track={track.track} number={i} />;
        })}
      </div>
    );
  }
};

export default SongsContainer;
