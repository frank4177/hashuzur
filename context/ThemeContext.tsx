import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../styles/theme';

// Define context type
type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

// Hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);

// Props type for provider
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize theme mode from localStorage if available
  const [mode, setMode] = useState<PaletteMode>('light');
  
  // Check localStorage when component mounts (client-side only)
  useEffect(() => {
    const storedMode = localStorage.getItem('theme-mode') as PaletteMode | null;
    if (storedMode) {
      setMode(storedMode);
    } else {
      // If no preference is stored, check for system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDarkMode ? 'dark' : 'light');
      localStorage.setItem('theme-mode', prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  // Toggle theme mode and update localStorage
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  // Generate theme based on current mode
  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};