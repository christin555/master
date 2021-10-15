import React, {Component} from 'react';
import s from './Header.module.scss';
import cn from 'classnames';
import {inject} from 'mobx-react';
import BurgerMenu from './Burger';
import {Link} from 'react-router-dom';

@inject(({RouterStore, HeaderStore}) => {
  return {
    HeaderStore: HeaderStore.search,
    setSearch: HeaderStore.setSearch,
    setParams: HeaderStore.setParams,
    pathname: RouterStore.pathname,
    RouterStore
  };
})
class Header extends Component {

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
      const {pathname, search, setParams, setSearch} = this.props;

      return (
        <div className={s.containerHeader}>

          <div className={s.top}>
            <div className={s.name}>
              <Link to={'/'}>
                <span className={s.red}> МАСТЕР </span> ПОЛА
              </Link>
            </div>
            <div className={s.info}>
              <div>
                  Тюмень, ул Федюнского 62 к1
              </div>
              <div>
                  ежедневно с 10:00 до 19:00
              </div>
            </div>

            <BurgerMenu toPage={this.toPage} menu={this.menu} />

          </div>

          <div className={s.menu}>
            {this.menuLinks}
          </div>
        </div>
      );
    }
}

export default Header;
