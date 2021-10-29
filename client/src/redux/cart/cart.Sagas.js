import {all,call,takeLatest ,put,select} from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import {selectCurrentUser} from '../user/user.selector';
import CartActionTypes from './cart.types';
import { clearCart,setCartFromfirebase } from './cartAction';
import {selectCartItems} from './cart.selector';
import {getUserCartRef} from '../../firebase/firebase.utils'
import { updateDoc,getDoc } from "firebase/firestore";

export function* clearCartOnSignOut(){
    yield put(clearCart())
}
export function* updateCartInFirebase(){
    const currentUser = yield select(selectCurrentUser);
    if(currentUser){
        try{
            const cartRef = yield getUserCartRef(currentUser.id);
            const cartItems = yield select(selectCartItems);
            yield updateDoc(cartRef,{cartItems})
           
        }catch(e){
            console.log(e);
        }
    }
}
export function* checkCartFromFirebase({payload:user}){
    const cartRef = yield getUserCartRef(user.id);
   const cartSnapshot =yield getDoc(cartRef);
    yield put(setCartFromfirebase(cartSnapshot.data().cartItems));
}
export function* onSignoutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearCartOnSignOut)
}
export function* onUserSignIn() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
  }
  export function* onCartChange() {
    yield takeLatest(
      [
        CartActionTypes.ADD_ITEM,
        CartActionTypes.REMOVE_ITEM,
        CartActionTypes.CLEAR_CART
      ],
      updateCartInFirebase
    );
  }
export function* cartSagas(){
    yield all([
        call(onSignoutSuccess),
        call(onCartChange),
        call(onUserSignIn)
    ])
}