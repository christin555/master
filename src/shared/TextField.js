import React from 'react';
import TextFieldUi from '@material-ui/core/TextField';
import withStylesUi from '@material-ui/core/styles/withStyles';
import {createStyles} from '@material-ui/core/styles';

const StyledTextField = withStylesUi(() => createStyles({
  root: {
    '& [class*="notchedOutline"]': {
      border: 'none'
    },
    '& [class*="MuiInput-underline"]': {
      '&:hover:not(:disabled):before, &:before, &:after ': {
        borderBottom: 'none'
      }
    },
    '& [class*="MuiInputBase-input"]': {
      'padding': '2px 5px',
      'minHeight': '20px',
      '&:disabled': {
        opacity: 0.5
      },
      '&::placeholder': {
        color: 'rgb(213,213,213)',
        opacity: 1
      },
      '&:hover:not(:focus):not(:disabled)': {
        borderColor: 'rgba(201,15,15,0.99)'
      },
      '&:focus, &:focus-visible': {
        'borderColor': 'none'
      }
    },
    '& [class*="MuiFormHelperText-root"]': {
      fontSize: '12px',
      margin: '0px',
      lineHeight: '16px'
    },

    '& [class*="MuiOutlinedInput-root"]': {
      'padding': '8px 12px',
      'borderRadius': '10px',
      'fontSize': '14px',
      'lineHeight': '20px',
      backgroundColor: 'white',
      'border': `1px solid ${'rgb(255,255,255)'}`,
      '&:hover:not(:focus):not(:disabled)': {
        borderColor: 'rgba(255,255,255,0.99)'
      },
      '&:focus, &:focus-within': {
        border: `1px solid ${'rgba(217,217,217,0.83)'}`
      },
      '& svg': {
        fontSize: '20px'
      }
    }
  }
}))(TextFieldUi);

const TextField = (props) => (
  <StyledTextField
    {...props}
  />
);

export default TextField;
