import React from 'react';
import PropTypes from 'prop-types';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import defaultPalette from './defaultPalette';

const DefaultStyle = (props) => {
  const {children, colors} = props;

  const defaultTheme = createTheme({
    palette: defaultPalette(colors || {})
  });

  return (
    <MuiThemeProvider theme={defaultTheme}>
      {children}
    </MuiThemeProvider>
  );
};

DefaultStyle.propTypes = {
  children: PropTypes.node,
  colors: PropTypes.object
};

export default DefaultStyle;
