import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {FormCheckbox} from '../Base/FormCheckbox';
import {SimpleAccordion} from '../Base/SimpleAccordion';

@inject(({FilterStore}) => {
  return {
    collections: FilterStore.collections,
    finishingMaterials: FilterStore.finishingMaterials,
    setValue: FilterStore.setValue
  };
})
class Fields extends Component {
  get collections() {
    return this.props.collections?.map((collection) => (
      <FormCheckbox
        key={collection.id}
        name={collection.name}
        id={collection.id}
        onChange={this.props.setValue('collectionId')}
      />
    ));
  }

  get finishingMaterials() {
    return this.props.finishingMaterials?.map((finishingMaterial) => (
      <FormCheckbox
        key={finishingMaterial.id}
        name={finishingMaterial.name}
        id={finishingMaterial.id}
        onChange={this.props.setValue('finishingMaterial')}
      />
    ));
  }

  render() {
    return (
      <React.Fragment>
        <SimpleAccordion id={1} name={'Коллекция'}>
          {this.collections}
        </SimpleAccordion>
        <SimpleAccordion id={2} name={'Материал отделки'}>
          {this.finishingMaterials}
        </SimpleAccordion>
      </React.Fragment>
    );
  }
}

Fields.propTypes = {
  collections: PropTypes.array,
  finishingMaterials: PropTypes.array,
  setCollection: PropTypes.func,
  setFinishingMaterial: PropTypes.func
};

export default Fields;