import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './main.module.scss';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import {inject} from 'mobx-react';
import classNames from 'classnames';

@inject(({RouterStore}) => {
  return {
    pathname: RouterStore.pathname,
    RouterStore
  };
})
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {alerts: []};
  }

  render() {
    const {children, pathname} = this.props;
    const isNotHome = pathname !== '/';

    return (
      <div className={s.wrapper}>
        <Header />
        <div className={classNames(s.content, {[s.isNotHome]: isNotHome})}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

Body.propTypes = {
  children: PropTypes.any
};

export default Body;
