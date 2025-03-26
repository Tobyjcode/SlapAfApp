import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';

export const spotifyAuthConfig = {
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUrl: 'myapp://spotify-login',
  scopes: [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'streaming',
    'user-modify-playback-state',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};