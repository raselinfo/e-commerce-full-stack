import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import themeSettings from './config';
import { useAppSelector } from '../store';

function ThemeProvide({ children }:{ children:React.ReactNode }) {
  const mode = useAppSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode) as ThemeOptions), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeProvide;
