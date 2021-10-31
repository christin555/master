import React, {memo} from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import Body from './bodyWrapper';
import Loader from 'shared/Loader';

const Page = loadable(
  ({name}) => {
    switch (name) {
      case 'home': {
        return import('../components/Home');
      }
      case 'about': {
        return import('../components/About');
      }
      case 'catalog': {
        return import('../components/Catalog');
      }
      case 'product': {
        return import('../components/Product');
      }
      case 'gallery': {
        return import('../components/Gallery');
      }
      case 'delivery': {
        return import('../components/Delivery');
      }
      case 'works': {
        return import('../components/Works');
      }
      case 'notFound': {
        return import('../shared/InformBlocks/PageNotFound');
      }

      default:

    }
  }, {
    fallback: (<Loader />),
    cacheKey: ({name}) => name
  }
);

const Wrapper = ({name}) => (
  <Body>
    <Page name={name} />
  </Body>
);

Wrapper.propTypes = {
  name: PropTypes.string
};

export default memo(Wrapper);
