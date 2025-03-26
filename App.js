import React, { useState, useEffect } from 'react';
import { Linking, Alert } from 'react-native';
import Navigation from './Navigation';
import { ThemeContext } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      console.log('Received deep link:', url);

      if (url.startsWith('myapp://spotify-login')) {
        const fragment = url.split('#')[1]; // Extract the fragment after #
        if (fragment) {
          const params = new URLSearchParams(fragment);
          const accessToken = params.get('access_token');
          if (accessToken) {
            console.log('Spotify Access Token:', accessToken);
            Alert.alert('Spotify Access Token Retrieved', accessToken);
          } else {
            console.error('Access token not found in the URL.');
          }
        } else {
          console.error('No fragment in the URL.');
        }
      } else {
        console.warn('Unhandled deep link:', url);
      }
    };

    // Add deep link event listener
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL if app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Cleanup listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <Navigation />
    </ThemeContext.Provider>
  );
}
