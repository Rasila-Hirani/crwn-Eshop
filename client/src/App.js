import React,{useEffect,lazy,Suspense} from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {GlobalStyle} from './global.styles';


import Header from './component/header/header';
import Spinner from './component/spinner/spinner';
import {selectCurrentUser} from './redux/user/user.selector';
import {checkUserSession} from './redux/user/userAction'
import ErrorBoundry from './component/error-boundry/error-boundry';
const HomePage = lazy(()=>import('./component/pages/homepage/homepage'));
const ShopPage = lazy(()=>import('./component/pages/shop/shop'));
const SignInSignUpPage = lazy(()=>import('./component/pages/sigin-in-and-sign-up/sigin-in-and-sign-up'));
const CheckoutPage = lazy(()=>import('./component/pages/checkout/checkout'));

const App =({checkUserSession,currentUser})=> {
  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])


    return (
      <div>
        <GlobalStyle/>
        <Header/>
        <Switch>
          <ErrorBoundry>
          <Suspense fallback={<Spinner/>}>
          <Route path='/' component={HomePage} exact/>
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact 
            path='/signin' 
            
            render={()=> currentUser?(<Redirect to='/'/>):(<SignInSignUpPage/>)
           
          }/>
          </Suspense>
          </ErrorBoundry>
        </Switch>
       
      </div>
    );
 
}
const mapStateTopProps =createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToProps=dispatch =>({
  checkUserSession:()=>dispatch(checkUserSession())
})

export default connect(mapStateTopProps,mapDispatchToProps)(App);
