import React from 'react';
import './App.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { MuiThemeProvider, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;