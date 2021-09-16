import React from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';
import CollectionOverview from '../../collection-overview/collection-overview';
import CategoryCollectionPage from '../category-collection/category-collection';
import {getShopData} from '../../../firebase/firebase.utils';
import {updateCollections} from '../../../redux/shop/shopAction';
import WithSpinner from '../../with-spinner/with-spinner';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CategoryCollectionPageWithSpinner = WithSpinner(CategoryCollectionPage);

class ShopPage extends React.Component{
    state={
        loading:true
    }

    unsubscribeFromSnapshot = null;
    componentDidMount(){
        getShopData().then(shopData =>{
            this.props.updateCollections(shopData)
            this.setState({loading:false})
           })
    
    }
    componentWillUnmount(){
        this.unsubscribeFromSnapshot = null;
    }

    render(){
        const {match} = this.props
        const {loading} = this.state;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props)=>
                     <CollectionOverviewWithSpinner isLoading={loading} {...props}/>

                }
                />
                <Route path={`${match.path}/:collectionId`} render={(props) =>
                    <CategoryCollectionPageWithSpinner isLoading={loading} {...props}/>
                }
                />
            </div>
        )
    }
            

}
const mapDispatchToProps =dispatch =>({
   updateCollections : collectionMap => dispatch(updateCollections(collectionMap))
})
export default connect(null,mapDispatchToProps)(ShopPage);
    