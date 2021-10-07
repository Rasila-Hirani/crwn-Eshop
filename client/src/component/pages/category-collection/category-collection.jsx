import React from 'react';
import {
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
  } from './category-collection.styles';
import { connect } from 'react-redux';
import CollectionItem from '../../collection-item/collection-item';
import { selectCategoryCollection } from '../../../redux/shop/shopDataSelector';

const CategoryCollectionPage =({collection})=>{
    const {title,items} =collection;
    return(
        <CollectionPageContainer>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionItemsContainer>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </CollectionItemsContainer>
      </CollectionPageContainer>
)}
const mapStateToProps =(state,ownProps)=>({
    collection:selectCategoryCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CategoryCollectionPage);