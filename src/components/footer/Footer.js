import React, { useState } from 'react';
import './footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleFilledOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeteIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import PlaylistIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { useStateProvidervalue } from '../../StateProvider';
import SpotifyWebapi from 'spotify-web-api-js';
const Footer = () => {
  const spotify = new SpotifyWebapi();
  const [{ currentlyPlaying }, dispatch] = useStateProvidervalue();
  const [currenyVolume, setcurrenyVolume] = useState(50);

  const UpdateCurrentlyPlaingState = async (currentlyPlayingState) => {
    try {
      await dispatch({
        type: 'SET_CURRENTLY_PLAYING',
        currentlyPlaying: currentlyPlayingState,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateVolume = async (event, newValue) => {
    if (newValue > currenyVolume + 5 || newValue < currenyVolume - 5) {
      setcurrenyVolume(newValue);
      try {
        await spotify.setVolume(newValue);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const ToggleRepete = async () => {
    try {
      let playState = await spotify.getMyCurrentPlaybackState();
      if (playState.repeat_state === 'off') {
        await spotify.setRepeat('track');
        playState.repeat_state = 'track';
      } else {
        await spotify.setRepeat('off');
        playState.repeat_state = 'off';
      }
      await UpdateCurrentlyPlaingState(playState);
    } catch (error) {
      console.log(error);
    }
  };
  const PlayPauseTrack = async () => {
    try {
      const isPlaying = await spotify.getMyCurrentPlaybackState();
      let newPlayState = currentlyPlaying;
      if (!isPlaying.is_playing) {
        await spotify.play();
        newPlayState.is_playing = true;
      } else {
        await spotify.pause();
        newPlayState.is_playing = false;
      }
      await UpdateCurrentlyPlaingState(newPlayState);
    } catch (error) {
      console.log(error);
    }
  };
  const ChangeTrack = async (next) => {
    try {
      if (next) {
        await spotify.skipToNext();
        await getCurrentlyPlayingSong();
      } else {
        await spotify.skipToPrevious();
        await getCurrentlyPlayingSong();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ToggleShuffleTracks = async () => {
    try {
      let playState = await spotify.getMyCurrentPlaybackState();
      if (playState?.shuffle_state) {
        await spotify.setShuffle(false);
        playState.shuffle_state = false;
      } else {
        await spotify.setShuffle(true);
        playState.shuffle_state = true;
      }
      await UpdateCurrentlyPlaingState(playState);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentlyPlayingSong = async () => {
    try {
      const CurrentlyPlaying = await spotify.getMyCurrentPlaybackState();
      await UpdateCurrentlyPlaingState(CurrentlyPlaying);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className='footer'>
      <div className='footer__left'>
        <img src={currentlyPlaying?.item?.album?.images[0].url} alt='' />
        <div className='footer__songInfo'>
          <h4>{currentlyPlaying?.item?.name}</h4>
          <p>
            {currentlyPlaying?.item?.artists
              .map((artist) => artist.name)
              .join(', ')}
          </p>
        </div>
      </div>

      <div className='footer__center'>
        <ShuffleIcon
          className={
            !currentlyPlaying?.shuffle_state ? 'footer__icon' : 'footer__green'
          }
          onClick={ToggleShuffleTracks}
        />
        <SkipPreviousIcon
          className='footer__icon'
          onClick={() => {
            ChangeTrack(false);
          }}
        />
        {!currentlyPlaying?.is_playing ? (
          <PlayCircleOutlineIcon
            fontSize='large'
            className='footer__icon'
            onClick={PlayPauseTrack}
          />
        ) : (
          <PauseIcon
            fontSize='large'
            className='footer__icon'
            onClick={PlayPauseTrack}
          />
        )}
        <SkipNextIcon
          className='footer__icon'
          onClick={() => {
            ChangeTrack(true);
          }}
        />
        <RepeteIcon
          className={
            currentlyPlaying?.repeat_state === 'off'
              ? 'footer__icon'
              : 'footer__green'
          }
          onClick={ToggleRepete}
        />
      </div>

      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              onChange={UpdateVolume}
              defaultValue={currentlyPlaying?.device?.volume_procentage || 50}
              valueLabelDisplay='on'
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
