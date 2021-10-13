import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionLoaded } from '../../../redux/shop/shopDataSelector';
import WithSpinner from '../../with-spinner/with-spinner';
import CategoryCollectionPage from './category-collection';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionLoaded(state)
  });
  
  const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
  )(CategoryCollectionPage);
  
  export default CollectionPageContainer;