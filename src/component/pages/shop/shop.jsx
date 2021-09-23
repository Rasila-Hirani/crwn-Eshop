import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {selectIsCollectionFetching,selectIsCollectionLoaded} from '../../../redux/shop/shopDataSelector';
import {fetchCollectionsStart} from '../../../redux/shop/shopAction';

import CollectionOverview from '../../collection-overview/collection-overview';
import CategoryCollectionPage from '../category-collection/category-collection';
import WithSpinner from '../../with-spinner/with-spinner';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CategoryCollectionPageWithSpinner = WithSpinner(CategoryCollectionPage);

class ShopPage extends React.Component{
    
    componentDidMount(){
        
        const {fetchCollectionsStart}=this.props;
        fetchCollectionsStart()
    
    }
    componentWillUnmount(){
      
    }

    render(){
        const {match,isFetching,isCollectionLoaded} = this.props
       
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props)=>
                     <CollectionOverviewWithSpinner isLoading={isFetching} {...props}/>

                }
                />
                <Route path={`${match.path}/:collectionId`} render={(props) =>
                    <CategoryCollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                }
                />
            </div>
        )
    }
            

}
const mapStateToProps =createStructuredSelector({
    isFetching :selectIsCollectionFetching,
    isCollectionLoaded:selectIsCollectionLoaded
})
const mapDispatchToProps =dispatch =>({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())

})
export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);
    