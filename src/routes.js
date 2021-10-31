import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {StoreWrapper} from './main/routeWrapper';
import {Provider} from 'mobx-react';
import RouterStore from './stores/Router';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import DefaultStyle from './themes/DefaultStyle';
import UrlStore from './stores/UrlStore';

// eslint-disable-next-line react/display-name
const wrap = (name) => (props) => <StoreWrapper {...props} name={name} />;

// eslint-disable-next-line react/display-name,react/no-multi-comp
export default () => (
  <DefaultStyle>
    <Provider RouterStore={RouterStore} UrlStore={UrlStore}>
      <BrowserRouter>
        <ReactNotification />
        <Switch>
          <Route
            exact={true}
            path='/'
            render={wrap('home')}
          />
          <Route
            exact={true}
            path='/about'
            render={wrap('about')}
          />
          <Route
            exact={true}
            path='/catalog/:category?'
            render={wrap('catalog')}
          />
          <Route
            exact={true}
            path='/product/:id'
            render={wrap('product')}
          />
          <Route
            exact={true}
            path='/gallery'
            render={wrap('gallery')}
          />
          <Route
            exact={true}
            path='/delivery'
            render={wrap('delivery')}
          />
          <Route
            exact={true}
            path='/works'
            render={wrap('works')}
          />
          <Route
            render={wrap('notFound')}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  </DefaultStyle>
);

