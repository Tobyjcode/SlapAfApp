import React, { useState } from 'react'; 
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { spotifyAuthConfig } from '../spotifyAuthConfig'; // Ensure the path is correct

export default function SpotifyPlaylistScreen() {
  const [loading, setLoading] = useState(true); // For the loading indicator
  const [error, setError] = useState(null); // For handling errors

  // Construct Spotify authorization URL
  const spotifyAuthUrl = `${spotifyAuthConfig.serviceConfiguration.authorizationEndpoint}?client_id=${
    spotifyAuthConfig.clientId
  }&response_type=token&redirect_uri=${encodeURIComponent(
    spotifyAuthConfig.redirectUrl
  )}&scope=${encodeURIComponent(
    spotifyAuthConfig.scopes.join(' ')
  )}&show_dialog=true`; // Forces Spotify to show the login dialog

  // Handle navigation state changes in the WebView
  const handleNavigationStateChange = (event) => {
    const { url } = event;

    // Check if the redirect URL is being loaded
    if (url.startsWith(spotifyAuthConfig.redirectUrl)) {
      const fragment = url.split('#')[1]; // Extract the fragment (hash)
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const accessToken = params.get('access_token'); // Extract the access token

        if (accessToken) {
          console.log('Spotify Access Token:', accessToken);
          Alert.alert('Spotify Access Token Retrieved', accessToken); // Display token for debugging
          // Optionally, navigate to another screen or close the WebView
        } else {
          console.error('Access token not found in the URL fragment.');
        }
      } else {
        console.error('No fragment found in the URL.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Show a loading spinner while the WebView loads */}
      {loading && <ActivityIndicator size="large" color="#1DB954" />}
      
      {/* Display an error message if WebView fails */}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {/* WebView for Spotify authorization */}
      <WebView
        source={{ uri: spotifyAuthUrl }} // Spotify login page
        onLoadEnd={() => setLoading(false)} // Stop the loading spinner
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView Error:', nativeEvent.description);
          setError(nativeEvent.description); // Display the error
        }}
        onNavigationStateChange={handleNavigationStateChange} // Handle redirects
        javaScriptEnabled={true} // Enable JavaScript for Spotify's login page
        domStorageEnabled={true} // Enable DOM storage for the WebView
        incognito={true} // Use incognito mode to avoid cached sessions
        cacheEnabled={false} // Disable caching
        startInLoadingState // Show spinner during initial load
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView HTTP Error:', nativeEvent.statusCode);
          Alert.alert('WebView HTTP Error', `Status code: ${nativeEvent.statusCode}`);
        }}
      />
    </View>
  );
}

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});
  