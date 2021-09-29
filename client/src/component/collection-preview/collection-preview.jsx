import React from 'react';
import { Link } from 'react-router-dom';
import './collection-preview.scss';
import CollectionItem from '../collection-item/collection-item';


const CollectionPreview =(otherProps)=>{

    const {title,items,routeName} = otherProps;
   return( <div className="collection-preview">
        <h1 className="title">
            <Link to={`/shop/${routeName}`}>{title.toUpperCase()}</Link>
            </h1>
        <div className="preview">
            {
                items
                .filter((item,idx)=> idx < 4 ).map((item) =>(
                   <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
    
)
        }
export default CollectionPreview;