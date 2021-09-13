import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../collection-overview/collection-overview';
import CategoryCollectionPage from '../category-collection/category-collection';

const ShopPage =({match}) =>(

            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CategoryCollectionPage}/>
            </div>
);

export default ShopPage
    