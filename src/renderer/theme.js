import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import brown from '@material-ui/core/colors/brown';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: teal,
    secondary: brown
  }
});

export default function withTheme(node) {
  return (
    <MuiThemeProvider theme={theme}>{node}</MuiThemeProvider>
  );
}
