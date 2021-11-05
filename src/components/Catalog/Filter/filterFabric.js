import DoorsFilterView from './Doors/view';
import LaminateFilterView from './Laminate/view';

export const filterFabric = (category) => {
  switch (category) {
    case DoorsFilterView.CATEGORY:
      return DoorsFilterView;
    case LaminateFilterView.CATEGORY:
      return LaminateFilterView;
    default:
      return null;
  }
};