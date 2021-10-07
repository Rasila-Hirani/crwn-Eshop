import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shopDataSelector';
import CollectionPreview from '../collection-preview/collection-preview';
import { CollectionsOverviewContainer } from './collection-overview.styles';

const CollectionOverview =({collections})=>{

    return(
 
      <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </CollectionsOverviewContainer>
)}
const mapStateToProps =createStructuredSelector({
    collections:selectCollectionForPreview
})
export default connect(mapStateToProps)(CollectionOverview)