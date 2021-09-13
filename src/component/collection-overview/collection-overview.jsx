import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shopDataSelector';
import CollectionPreview from '../collection-preview/collection-preview';
import './collection-overview.scss'

const CollectionOverview =({collections})=>{
    console.log(collections)
    return(
    <div className="collections-overview">
        {
                    collections.map(({id,...otherProps}) =>(
                        <CollectionPreview key ={id} {...otherProps}/>
                    ))
                }
    </div>
)}
const mapStateToProps =createStructuredSelector({
    collections:selectCollectionForPreview
})
export default connect(mapStateToProps)(CollectionOverview)