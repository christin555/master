import React from 'react';
import s from './Hierarchy.module.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {inject} from 'mobx-react';

@inject(({RouterStore}) => {
  return {RouterStore};
})
class Hierarchy extends React.Component {

    routeChange = (alias) => {
      const {RouterStore} = this.props;
      const pathname = `/catalog/${alias}`;

      RouterStore.history.push({pathname});
    }

    toCatalog = () => this.props.RouterStore.history.push({pathname: '/catalog'});

    render() {
      const {hierarchy = []} = this.props;

      return (
        <div className={s.level}>
          <span onClick={this.toCatalog}>Каталог</span>
          {
            hierarchy.map(({name, alias}, index) => (
              <React.Fragment key={index}>
                <ArrowForwardIosIcon className={s.icon} />
                <span
                  onClick={() => alias && this.routeChange(alias)}
                  className={index === hierarchy.length - 1 && s.last || null}
                >
                  {name}
                </span>
              </React.Fragment>
            ))
          }
        </div>
      );

    }
}

export default Hierarchy;
