const redirectUri = 'http://localhost:3000/';
const clientID = '4d0c0cac7927434bb004547098bc6fc0';
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
];
const authEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let part = item.split('=');
      initial[part[0]] = decodeURIComponent(part[1]);
      return initial;
    }, {});
};
export { authEndpoint, getTokenFromUrl };
