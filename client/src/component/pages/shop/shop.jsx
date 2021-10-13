import React,{useEffect,lazy,Suspense} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {fetchCollectionsStart} from '../../../redux/shop/shopAction';
import Spinner from '../../spinner/spinner';
import {ShopPageContainer} from './shop.styles';

const CollectionsOverviewContainer = lazy(()=>import('../../collection-overview/collection-overview-container'));
const CategoryCollectionPageContainer = lazy(() => import('../category-collection/category-collection-container'));



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
                    component={CollectionsOverviewContainer}/>
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
    