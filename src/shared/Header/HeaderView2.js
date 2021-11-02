import React, {Component} from 'react';
import s from './Header2.module.scss';
import cn from 'classnames';
import {inject} from 'mobx-react';
import BurgerMenu from './Burger';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';

@inject(({RouterStore, HeaderStore}) => {
  return {
    HeaderStore: HeaderStore.search,
    setSearch: HeaderStore.setSearch,
    setParams: HeaderStore.setParams,
    pathname: RouterStore.pathname,
    RouterStore
  };
})
class HeaderView2 extends Component {
    state = {
      isScrolled: false
    }

    componentDidMount() {
      window.addEventListener('scroll', this.listenScrollEvent);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent = () => {
      if (window.scrollY > 20) {
        this.setState({isScrolled: true});
      } else {
        this.setState({isScrolled: false});
      }
    }

    menu = [
      {name: 'Каталог', important: true, link: '/catalog'},
      {name: 'О нас', important: false, link: '/about'},
      //{name: 'Контакты', important: false, link: '/contacts'},
      {name: 'Оплата и доставка', important: false, link: '/delivery'},
      {name: 'Наш блог', important: false, link: '/gallery'},
      {name: 'Услуги', link: '/works'}
    ]

    get menuLinks() {
      const {pathname} = this.props;

      return this.menu.map(({name, link}, index) => (
        <Link
          key={`${link}${index}`}
          className={cn({
            [s.isActive]: link === pathname
          })}
          to={link}
        >
          {name}
        </Link>
      ));
    }

    render() {
      const {isScrolled} = this.state;
      const {pathname} = this.props;
      const isHome = pathname === '/';

      return (
        <header className={s.header}>
          <div className={cn(s.containerHeader, {[s.isScrolled]: isScrolled, [s.isHome]: isHome})}>
            <Link to={'/'}>
              <div className={s.name}>
                <div className={s.logo}>
                  <img src={logo} />
                </div>
                  МАСТЕР ПОЛА
              </div>
            </Link>

            <div className={s.menu}>
              {this.menuLinks}
            </div>
            <BurgerMenu toPage={this.toPage} menu={this.menu} />
          </div>
        </header>
      );
    }
}

export default HeaderView2;
