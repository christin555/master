import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {FormCheckbox} from '../Base/FormCheckbox';
import {SimpleAccordion} from '../Base/SimpleAccordion';
import {toJS} from 'mobx';

@inject(({FilterStore}) => {
  return {
    color: FilterStore.color,
    resistanceClasses: FilterStore.resistanceClasses,
    thickness: FilterStore.thickness,
    width: FilterStore.width,
    brands: FilterStore.brands,
    collections: FilterStore.collections,
    setValue: FilterStore.setValue,
    checked: toJS(FilterStore.checked),
    disabled: toJS(FilterStore.disabled),

    isColorActive: FilterStore.isColorActive,
    isResistanceClassesActive: FilterStore.isResistanceClassesActive,
    isThicknessActive: FilterStore.isThicknessActive,
    isWidthActive: FilterStore.isWidthActive,
    isBrandsActive: FilterStore.isBrandsActive,
    isCollectionsActive: FilterStore.isCollectionsActive,
    isWithHeatingFloor: FilterStore.isWithHeatingFloor
  };
})
class Fields extends Component {
  get color() {
    return this.props.color?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('color', id)}
        key={id}
        name={name}
        id={id}
        onChange={this.props.setValue('color')}
      />
    ));
  }

  get resistanceClasses() {
    return this.props.resistanceClasses?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('resistanceClass', id)}
        key={id}
        name={name}
        id={id}
        onChange={this.props.setValue('resistanceClass')}
      />
    ));
  }

  get thickness() {
    return this.props.thickness?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('thickness', id)}
        key={id}
        name={name}
        id={id}
        onChange={this.props.setValue('thickness')}
      />
    ));
  }

  get width() {
    return this.props.width?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('width', id)}
        key={id}
        name={name}
        id={id}
        onChange={this.props.setValue('width')}
      />
    ));
  }

  get brands() {
    return this.props.brands?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('brandId', id)}
        key={id}
        name={name}
        id={id}
        onChange={this.props.setValue('brandId')}
      />
    ));
  }

  get collections() {
    return this.props.collections?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('collectionId', id)}
        key={id}
        name={name}
        id={id}
        disabled={this.isDisabled('collectionId', id)}
        onChange={this.props.setValue('collectionId')}
      />
    ));
  }

  get withHeatingFloor() {
    return (
      <FormCheckbox
        checked={this.isChecked('withHeatingFloor', 1)}
        name={'Да'}
        id={1}
        onChange={this.props.setValue('withHeatingFloor')}
      />
    );
  }

  isChecked = (key, value) => {
    const {checked} = this.props;

    return checked[`${key}-${value}`] || false;
  };

  isDisabled = (key, value) => {
    const {disabled} = this.props;

    return disabled[`${key}-${value}`];
  };

  render() {
    const {
      isColorActive,
      isResistanceClassesActive,
      isThicknessActive,
      isWidthActive,
      isBrandsActive,
      isCollectionsActive,
      isWithHeatingFloorActive
    } = this.props;

    return (
      <React.Fragment>
        <SimpleAccordion id={1} name={'Бренд'} active={isBrandsActive}>
          {this.brands}
        </SimpleAccordion>
        <SimpleAccordion id={2} name={'Коллекция'} active={isCollectionsActive}>
          {this.collections}
        </SimpleAccordion>
        <SimpleAccordion id={3} name={'Оттенок'} active={isColorActive}>
          {this.color}
        </SimpleAccordion>
        <SimpleAccordion id={4} name={'Класс нагрузки'} active={isResistanceClassesActive}>
          {this.resistanceClasses}
        </SimpleAccordion>
        <SimpleAccordion id={5} name={'Совместимость с теплыми полами'} active={isWithHeatingFloorActive}>
          {this.withHeatingFloor}
        </SimpleAccordion>
        <SimpleAccordion id={6} name={'Толщина'} active={isThicknessActive}>
          {this.thickness}
        </SimpleAccordion>
        <SimpleAccordion id={7} name={'Ширина'} active={isWidthActive}>
          {this.width}
        </SimpleAccordion>
      </React.Fragment>
    );
  }
}

Fields.propTypes = {
  collections: PropTypes.array,
  finishingMaterials: PropTypes.array,
  setCollection: PropTypes.func,
  setFinishingMaterial: PropTypes.func,
  checkedCollections: PropTypes.object
};

export default Fields;