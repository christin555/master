import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Wrapper from './main/routWrapper';
import {Provider} from 'mobx-react';
import RouterStore from './stores/Router';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import DefaultStyle from './themes/DefaultStyle';
require('dayjs/locale/ru');

// eslint-disable-next-line react/display-name
export default () => (
  <DefaultStyle>
    <Provider RouterStore={RouterStore}>
      <BrowserRouter>
        <ReactNotification />
        <Switch>
          <Route
            exact={true}
            path='/'
            render={(props) => <Wrapper {...props} name={'home'} />}
          />
          <Route
            exact={true}
            path='/about'
            render={(props) => <Wrapper {...props} name={'about'} />}
          />
          <Route
            exact={true}
            path='/catalog/:category?'
            render={(props) => <Wrapper {...props} name={'catalog'} />}
          />
          <Route
            exact={true}
            path='/product/:id'
            render={(props) => <Wrapper {...props} name={'product'} />}
          />
          <Route
            exact={true}
            path='/blog'
            render={(props) => <Wrapper {...props} name={'blog'} />}
          />
          <Route
            exact={true}
            path='/delivery'
            render={(props) => <Wrapper {...props} name={'delivery'} />}
          />
          <Route
            exact={true}
            path='/works'
            render={(props) => <Wrapper {...props} name={'works'} />}
          />
          <Route
            render={(props) => <Wrapper {...props} name={'notFound'} />}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  </DefaultStyle>
);

