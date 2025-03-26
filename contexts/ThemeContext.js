import React, { createContext } from 'react';

export const ThemeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
});
