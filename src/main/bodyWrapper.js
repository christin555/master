import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './main.module.scss';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import {inject} from 'mobx-react';
import cn from 'classnames';

@inject(({RouterStore}) => {
  return {
    pathname: RouterStore.pathname
  };
})
class Body extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const {children, pathname} = this.props;
    const isNotHome = pathname !== '/';

    return (
      <div className={s.wrapper}>
        <Header />
        <div className={cn(s.content, {[s.isNotHome]: isNotHome})}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

Body.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string
};

export default Body;
