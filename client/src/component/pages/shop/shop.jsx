import React,{useEffect,lazy,Suspense} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {fetchCollectionsStart} from '../../../redux/shop/shopAction';
import Spinner from '../../spinner/spinner';
import {ShopPageContainer} from './shop.styles';

const CollectionOverviewContainer = lazy(()=>import('../../collection-overview/collection-overview'));
const CategoryCollectionPageContainer = lazy(() => import('../category-collection/category-collection'));



const ShopPage =({match,fetchCollectionsStart})=>{
    useEffect(()=>{
        fetchCollectionsStart()
    },[fetchCollectionsStart])
     
        return(
            <ShopPageContainer>
                <Suspense fallback={<Spinner/>}>
                <Route 
                    exact 
                    path={`${match.path}`}
                    component={CollectionOverviewContainer}/>
                <Route 
                    path={`${match.path}/:collectionId`}
                    component={CategoryCollectionPageContainer}
                    />
             
                </Suspense>
              </ShopPageContainer>
        )
    }
 

const mapDispatchToProps =dispatch =>({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())

})
export default connect(null,mapDispatchToProps)(ShopPage);
    