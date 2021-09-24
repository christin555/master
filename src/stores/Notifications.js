import {store} from 'react-notifications-component';

export const alert = ({type, title = ' ', message = ' '}) => {
  const opt = {
    container: 'top-right',
    dismiss: {
      duration: 3000,
      onScreen: true
    },
    showIcon: true
  };

  switch (type) {
    case 'info':
      store.addNotification({title, message, type, ...opt});
      break;
    case 'success':
      store.addNotification({title, message, type, ...opt});
      break;
    case 'warning':
      store.addNotification({title, message, type, ...opt});
      break;
    case 'error':
      store.addNotification({title, message, type: 'danger', ...opt});
  }
};
