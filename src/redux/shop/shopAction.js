import shopActionTypes from './shop.types';



export const fetchCollectionsStart =()=>({
    type:shopActionTypes.START_FETCH_COLLECTIONS
   
})
export const fetchCollectionsSuccess =(collectionMap)=>({
    type:shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionMap
})
export const fetchCollectionsFailure =(errorMessage) =>({
    type:shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:errorMessage
})
