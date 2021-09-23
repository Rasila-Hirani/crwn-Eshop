import {takeLatest, call ,all, put} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {signInSuccess,
        signInFailure,
        signOutSuccess,
        signOutFailure,
        signUpSucess,
         signUpFailure} from './userAction';
import {
    signInWithGoogle,
    createUserProfileDocument,
    signInwithEmailPassword,
    signUpwithEmailAndPassword,
    getCurrentUser,auth} from '../../firebase/firebase.utils';

export function* getSnapFromUserAuth(userAuth,additionalData){
    try{
        const userSnap = yield call(createUserProfileDocument,userAuth,additionalData)
        yield put(signInSuccess({
            id:userSnap.id,
              ...userSnap.data()
          }))
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapFromUserAuth(userAuth)
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* startSignInWithGoogle(){
    try{
        const {user} = yield signInWithGoogle();
       yield getSnapFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* startSignInWithEmail({payload:{email,password}}){
    
    try{
        const {user} = yield signInwithEmailPassword(email,password);
        yield getSnapFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* startSignUp({payload:{email,password,displayName}}){
    try{
        const {user} = yield signUpwithEmailAndPassword(email,password);
        yield put(signUpSucess({user,additionalData:{displayName}}))
    }catch(error){
        yield put(signUpFailure(error))
    }
}
export function* signInAfterSignUp({payload:{user,additionalData}}){
   yield getSnapFromUserAuth(user,additionalData)
}
export function* startSignout(){
    try{
        yield auth.signOut();
        yield  put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error))
    }
}
export function* onGooglesignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,startSignInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,startSignInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}
export function* onSignoutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,startSignout)
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,startSignUp)
}
export function* onSignupSucess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
}
export function* userSagas(){
    yield all([
        call(onGooglesignInStart),
        call(onEmailSignInStart),
       
        call(onCheckUserSession),
        call(onSignoutStart),
        call(onSignUpStart),
        call(onSignupSucess)
    ])
}