import React from 'react';
import './songRow.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateProvidervalue } from '../../StateProvider';
const Songrow = ({ track, number }) => {
  const [{}, dispatch] = useStateProvidervalue();
  const spotify = new SpotifyWebApi();
  return (
    <div
      className='songRow'
      onClick={async () => {
        try {
          await spotify.play({
            uris: [track.uri],
          });
          const newPlayState = await spotify.getMyCurrentPlaybackState();
          dispatch({
            type: 'SET_CURRENTLY_PLAYING',
            currentlyPlaying: newPlayState,
          });
        } catch (error) {
          console.log(error.responseText);
        }
      }}
    >
      <p>{number + 1}</p>
      <img className='song__album' src={track?.album?.images[0]?.url} alt='' />
      <div className='songRow__info'>
        <h1>{track.name}</h1>
        <p>{track?.artists.map((artist) => artist?.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default Songrow;
