import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Wrapper from './main/routWrapper';
import {Provider} from "mobx-react";
import RouterStore from './stores/Router';

// eslint-disable-next-line react/display-name
export default () => {
    return (
        <Provider RouterStore={RouterStore}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path='/'
                        render={(props) => <Wrapper {...props} name={'home'}/>}
                    />
                    <Route render={() => <div>{'Miss'}</div>}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

