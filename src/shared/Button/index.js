import React from 'react';
import PropTypes from 'prop-types';
import ButtonUi from '@material-ui/core/Button';
import {createStyles, withStyles} from '@material-ui/core/styles';
import cn from 'classnames';

const StyledButton = withStyles((theme) =>
  createStyles({
    root: {
      fontWeight: 500,
      fontSize: '18px',
      height: '40px',
      lineHeight: '20px',
      letterSpacing: '.25px',
      textTransform: 'none',
      boxSizing: 'border-box',
      boxShadow: 'none',
      minWidth: 0,
      '&:hover, &:active': {
        boxShadow: 'none'
      },
      '& [class*="btnLabel"]': {
        width: '100%',
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
        whiteSpace: 'nowrap'
      },
      '&[class*="outlined"]': {
        color: theme.palette.white,
        borderColor: theme.palette.white,
        backgroundColor: 'inherit',
        padding: '8px 4px',
        '&[class*="active"]': {
          color: theme.palette.gray500,
          backgroundColor: theme.palette.white
        },
        '&:hover': {
          color: theme.palette.gray500,
          backgroundColor: theme.palette.white
        }
      }
    }
  }))(ButtonUi);

const Button = (props) => {
  const {
    children,
    variant,
    className,
    ...elementProps
  } = props;
  const classes = cn(variant, className);

  return (
    <StyledButton
      className={classes}
      variant={variant}
      disableElevation={true}
      disableFocusRipple={true}
      {...elementProps}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   Вид кнопки
   */
  variant: PropTypes.oneOf([
    'outlined',
    'dark'
  ]),
  /**
   Обработчик события клика на кнопку
   */
  onClick: PropTypes.func,
  /**
   Класс, который добавится к кнопке
   */
  className: PropTypes.string,
  /**
   * Текст кнопки
   */
  children: PropTypes.node
};

export default Button;