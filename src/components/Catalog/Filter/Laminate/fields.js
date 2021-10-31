import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {FormCheckbox} from '../Base/FormCheckbox';
import {SimpleAccordion} from '../Base/SimpleAccordion';

@inject(({FilterStore}) => {
  return {
    colorFamily: FilterStore.colorFamily,
    resistanceClasses: FilterStore.resistanceClasses,
    thickness: FilterStore.thickness,
    width: FilterStore.width,
    brands: FilterStore.brands,
    collections: FilterStore.collections,
    setCollection: FilterStore.setCollection
  };
})
class Fields extends Component {
  get colorFamily() {
    return this.props.colorFamily?.map((collection) => (
      <FormCheckbox
        key={collection.id}
        name={collection.name}
        id={collection.id}
        onChange={this.props.setCollection}
      />
    ));
  }

  get resistanceClasses() {
    return this.props.resistanceClasses?.map((resistanceClasses) => (
      <FormCheckbox
        key={resistanceClasses.id}
        name={resistanceClasses.name}
        id={resistanceClasses.id}
        onChange={this.props.setCollection}
      />
    ));
  }

  get thickness() {
    return this.props.thickness?.map((thickness) => (
      <FormCheckbox
        key={thickness.id}
        name={thickness.name}
        id={thickness.id}
        onChange={this.props.setCollection}
      />
    ));
  }

  get width() {
    return this.props.width?.map((width) => (
      <FormCheckbox
        key={width.id}
        name={width.name}
        id={width.id}
        onChange={this.props.setFinishingMaterial}
      />
    ));
  }

  get brands() {
    return this.props.brands?.map((brand) => (
      <FormCheckbox
        key={brand.id}
        name={brand.name}
        id={brand.id}
        onChange={this.props.setCollection}
      />
    ));
  }

  get collections() {
    return this.props.collections?.map((collection) => (
      <FormCheckbox
        key={collection.id}
        name={collection.name}
        id={collection.id}
        onChange={this.props.setCollection}
      />
    ));
  }

  get withHeatingFloor() {
    return (
      <FormCheckbox
        name={'Да'}
        id={1}
        onChange={this.props.setCollection}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <SimpleAccordion id={1} name={'Бренд'}>
          {this.brands}
        </SimpleAccordion>
        <SimpleAccordion id={2} name={'Коллекция'}>
          {this.collections}
        </SimpleAccordion>
        <SimpleAccordion id={3} name={'Оттенок'}>
          {this.colorFamily}
        </SimpleAccordion>
        <SimpleAccordion id={4} name={'Класс нагрузки'}>
          {this.resistanceClasses}
        </SimpleAccordion>
        <SimpleAccordion id={5} name={'Совместимость с теплыми полами'}>
          {this.withHeatingFloor}
        </SimpleAccordion>
        <SimpleAccordion id={6} name={'Толщина'}>
          {this.thickness}
        </SimpleAccordion>
        <SimpleAccordion id={7} name={'Ширина'}>
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
  setFinishingMaterial: PropTypes.func
};

export default Fields;