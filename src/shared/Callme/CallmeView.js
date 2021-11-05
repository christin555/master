import React from 'react';
import s from './Callme.module.scss';
import {Modal, TextField, IconButton} from '@material-ui/core';
import Button from '../Button';
import CloseIcon from '@material-ui/icons/Close';
import MaskedInput from 'react-text-mask';
import Card from '../Cards/Card';
import {inject} from 'mobx-react';
import cn from 'classnames';

@inject(({CallmeStore}) => {
  return {
    isShow: CallmeStore.isShow,
    toggleShow: CallmeStore.toggleShow,
    name: CallmeStore.name,
    setName: CallmeStore.setName,
    phone: CallmeStore.phone,
    setPhone: CallmeStore.setPhone,
    apply: CallmeStore.apply
  };
})
class Callme extends React.Component {
  textMaskCustom = (props) => {
    const {inputRef, ...other} = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'_'}
        showMask={true}
      />
    );
  }

  render() {
    const {
      className,
      isShow,
      toggleShow,
      product,
      name,
      phone,
      setPhone,
      setName,
      apply,
      buttonText,
      buttonProps,
      isShowButText = true
    } = this.props;
    const headerTitle = product && 'Оставить заявку на товар' || 'Заказать звонок';

    return (
      <React.Fragment>
        <Button
          variant={'outlined'}
          onClick={toggleShow}
          className={cn(s.buttonMain, className)}
          {...buttonProps}
        >
          {isShowButText && (buttonText || 'Оставить заявку')}
        </Button>
        <Modal
          disablePortal={true}
          disableEnforceFocus={true}
          disableAutoFocus={true}
          open={!!isShow}
          onClose={toggleShow}
        >
          <div className={s.wrapper}>
            <div className={s.header}>
              <span className={s.title}>  {headerTitle} </span>
              <IconButton onClick={toggleShow} className={s.closeButton}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={s.content}>
              <span className={s.desc}>
                Введите свой номер телефона и Вам поступит бесплатный звонок от нашего салона
              </span>
              {
                product && (
                  <Card {...product} withPhone={false} />
                )
              }
              <div className={s.inputs}>
                <TextField
                  onChange={setName}
                  label={'Имя'}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant={'outlined'}
                  value={name}
                />
                <TextField
                  onChange={setPhone}
                  variant={'outlined'}
                  value={phone}
                  label={'Номер'}
                  InputProps={{inputComponent: this.textMaskCustom}}
                />
              </div>
              <div className={s.helperText}>
                Я даю согласие на обработку моих персональных данных
              </div>
              <div>
                <Button
                  size={'small'}
                  className={s.call}
                  onClick={() => apply(product)}
                >
                  Оставить заявку
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Callme;
