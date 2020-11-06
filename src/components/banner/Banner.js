import React from 'react';
import './banner.css';
import { useStateProvidervalue } from '../../StateProvider';

const Banner = () => {
  const [{ discover_weekly, selectedPlaylist }] = useStateProvidervalue();
  if (selectedPlaylist) {
    return (
      <div className='body__info'>
        <img src={selectedPlaylist?.images[0].url} alt='' />
        <div className='body__infoText'>
          <strong>PLAYLIST</strong>
          <h2>{selectedPlaylist?.name}</h2>
          <p>{selectedPlaylist?.description}</p>
        </div>
      </div>
    );
  }
  return (
    <div className='body__info'>
      <img src={discover_weekly?.images[0].url} alt='' />
      <div className='body__infoText'>
        <strong>PLAYLIST</strong>
        <h2>{discover_weekly?.name}</h2>
        <p>{discover_weekly?.description}</p>
      </div>
    </div>
  );
};

export default Banner;
