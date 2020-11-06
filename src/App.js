import React, { useEffect, useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebapi from 'spotify-web-api-js';
// import Player from './components/player/Player';
import { useStateProvidervalue } from './StateProvider';
import Sidebar from './components/sidebar/Sidebar';
import Body from './components/body/Body';
import Footer from './components/footer/Footer';

function App() {
  const spotify = useMemo(() => new SpotifyWebapi(), []);
  const [{ token }, dispatch] = useStateProvidervalue();

  useEffect(() => {
    const _token = getTokenFromUrl();

    const setToken = async () => {
      if (_token.access_token) {
        window.location.hash = '';
        dispatch({
          type: 'SET_TOKEN',
          token: _token,
        });
        try {
          spotify.setAccessToken(_token.access_token);
        } catch (error) {
          console.log(error);
          //Error handling on invalid token
        }
      }
    };

    const getUser = async () => {
      if (token !== null) {
        try {
          const user = await spotify.getMe();
          dispatch({
            type: 'SET_USER',
            user: user,
          });
        } catch (error) {
          console.log(error);
          //error handling on eerror getting user!
        }
      }
    };

    const getUserPlaylists = async () => {
      let currentPlaylistOffset = 50;
      let limit = 50;
      try {
        if (token) {
          let currentSetOfUSerPlaylists = await spotify.getUserPlaylists({
            limit: limit,
          });
          let allUserPlaylists = currentSetOfUSerPlaylists;

          //gets all users playlists
          while (currentSetOfUSerPlaylists.next) {
            console.log('LOG 1');
            currentSetOfUSerPlaylists = await spotify.getUserPlaylists({
              limit: limit,
              offset: currentPlaylistOffset,
            });
            currentPlaylistOffset += 50;
            allUserPlaylists.items = [
              ...allUserPlaylists.items,
              ...currentSetOfUSerPlaylists.items,
            ];
          }

          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: allUserPlaylists,
          });
        }
      } catch (error) {
        console.log(error);
        //error handling on getting playlists
      }
    };

    const getSpotifyDiscoverWeeklyFeed = async () => {
      try {
        const test = await spotify.getFeaturedPlaylists();
        console.log('ASDASDASDASDASDA', test);
        const discoverPlaylist = await spotify.getPlaylist(
          '37i9dQZEVXcMydDJQdEUmb'
        );
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: discoverPlaylist,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getCurrentlyPlayingSong = async () => {
      try {
        const CurrentlyPlaying = await spotify.getMyCurrentPlaybackState();
        console.log('TEST CURRENTLY', CurrentlyPlaying);
        dispatch({
          type: 'SET_CURRENTLY_PLAYING',
          currentlyPlaying: CurrentlyPlaying,
        });
      } catch (error) {
        console.log(error);
      }
    };

    setToken();
    getCurrentlyPlayingSong();
    getSpotifyDiscoverWeeklyFeed();
    getUser();
    getUserPlaylists();
  }, [token, dispatch, spotify]);

  return (
    <div className='app'>
      {token ? (
        <div className='player__body'>
          <Router>
            <Sidebar />
            <Switch>
              <Route path='/' exact component={Body} />
            </Switch>
            <Footer />
          </Router>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
