import {DoorsStore} from './Doors/store';
import {LaminateStore} from './Laminate/store';
import DoorsFields from './Doors/fields';
import LaminateFields from './Laminate/fields';

export const filterFabric = (category) => {
  switch (category) {
    case DoorsStore.category:
      return {Store: DoorsStore, Fields: DoorsFields};
    case LaminateStore.category:
      return {Store: LaminateStore, Fields: LaminateFields};
    default:
      return null;
    // throw new Error('Unknown store');
  }
};