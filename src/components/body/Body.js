import React from 'react';
import './body.css';
import Header from '../header/Header';
import Banner from '../banner/Banner';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongsContainer from '../songsContainer/SongsContainer';
function Body() {
  return (
    <div className='body'>
      <Header />
      <Banner />
      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon className='body__shuffle__play' />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
      </div>
      <SongsContainer />
    </div>
  );
}

export default Body;
