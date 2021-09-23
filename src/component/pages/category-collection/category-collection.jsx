import React from 'react';
import './category-collection.scss'
import { connect } from 'react-redux';
import CollectionItem from '../../collection-item/collection-item';
import { selectCategoryCollection } from '../../../redux/shop/shopDataSelector';

const CategoryCollectionPage =({collection})=>{
   
   
    const {title,items} =collection;
    return(
    <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {
                items.map((item) =>(
                   <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
)}
const mapStateToProps =(state,ownProps)=>({
    collection:selectCategoryCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CategoryCollectionPage);