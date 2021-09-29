import { takeLatest ,put,all,call} from 'redux-saga/effects';
import shopActionTypes from './shop.types';
import {getShopData} from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess,fetchCollectionsFailure } from './shopAction';

export function* fetchCollectionsAsync(){
   
    const collectionMap  = yield getShopData()
    try{
        yield put(fetchCollectionsSuccess(collectionMap))
    }catch(error){
        yield put(fetchCollectionsFailure(error))
    }
    
}
export function* fetchCollectionsStart(){
    yield takeLatest(shopActionTypes.START_FETCH_COLLECTIONS, fetchCollectionsAsync)
}

export function* shopSagas(){
   yield all([
       call(fetchCollectionsStart)
   ])
}