import React, {Component} from 'react';
import s from './Header.module.scss';
import cn from 'classnames';
import logo from '../../shared/img/logo.png';
import TextField from '../../shared/TextField';
import SearchIcon from '@material-ui/icons/Search';
import PlaceIcon from '@material-ui/icons/Place';
import {inject} from 'mobx-react';
import {Tooltip} from '@material-ui/core';
import BurgerMenu from './Burger';

@inject(({RouterStore, HeaderStore}) => {
  return {
    search: HeaderStore.search,
    setSearch: HeaderStore.setSearch,
    setParams: HeaderStore.setParams,
    pathname: RouterStore.pathname,
    RouterStore
  };
})
class Header extends Component {
  state = {
    isScrolled: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  onKeyPressHandler = (event) => {
    if (event.charCode === 13) {
      this.props.setParams();
    }
  }

  listenScrollEvent = () => {
    if (window.scrollY > 40) {
      this.setState({isScrolled: true});
    } else {
      this.setState({isScrolled: false});
    }
  }

  toPage = (pathname) => this.props.RouterStore.history.push({pathname});

  menu = [
    {name: 'Каталог', important: true, link: '/catalog'},
    {name: 'О нас', important: false, link: '/about'},
    //{name: 'Контакты', important: false, link: '/contacts'},
    {name: 'Оплата и доставка', important: false, link: '/delivery'},
    {name: 'Наш блог', important: false, link: '/gallery'},
    {name: 'Услуги', important: true, link: '/works'}
  ]

  render() {
    const {isScrolled} = this.state;
    const {pathname, search, setParams, setSearch} = this.props;

    const isHome = pathname === '/';

    return (
      <header className={s.containerHeader}>
        <div className={cn(s.header, {[s.isScrolled]: isScrolled, [s.isHome]: isHome})}>
          <div className={s.headerBackground} />
          <div className={s.headerContent}>
            <div
              className={s.logoBlock}
              onClick={() => this.toPage('/')}
            >
              <div className={s.logo}>
                <img src={logo} />
              </div>
              <div className={s.name}>
                <div> МАСТЕР ПОЛА</div>
              </div>
            </div>
            <div className={s.left}>
              <div className={s.search}>
                <TextField
                  placeholder={'Поиск'}
                  value={search}
                  onChange={setSearch}
                  onKeyPress={this.onKeyPressHandler}
                />
                <SearchIcon onClick={setParams} />
              </div>
              <a href={'tel:+79829881522'} className={s.phone}>
                  +7 (982) 988-15-22
              </a>
              <Tooltip title={'г. Тюмень, ул. Федюнинского д. 62 к. 1'}>
                <a
                  target={'_blank'}
                  rel='noopener noreferrer'
                  className={s.address}
                  href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
                >
                  <PlaceIcon className={s.iconContact} />
                </a>
              </Tooltip>
            </div>
            <BurgerMenu toPage={this.toPage} menu={this.menu} />
          </div>
        </div>
        <div className={s.menuContainer}>
          <div className={cn(s.menu, {[s.isHome]: isHome})}>
            {
              this.menu.map(({name, important, link}, index) => (
                <a
                  key={`${link}${index}`}
                  className={cn({
                    [s.important]: important,
                    [s.isActive]: link === pathname
                  })}
                  href={link}
                >
                  {name}
                </a>
              ))
            }
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
