import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import HomePage from './component/pages/homepage/homepage';
import Header from './component/header/header';
import ShopPage from './component/pages/shop/shop';
import {auth} from './firebase/firebase.utils';
import SignInSignUpPage from './component/pages/sigin-in-and-sign-up/sigin-in-and-sign-up';

class App extends React.Component {
  constructor(){
    super();
    
    this.state={
      currentUser:null
    }
  }
  unsubscriveFromAuth=null;

  componentDidMount(){
  this.unsubscriveFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser:user});
      console.log(user )
    })
  }
  componentWillUnmount(){
    this.unsubscriveFromAuth();
  }
  render(){
    return (
      <div>
        
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage}/>
        </Switch>
       
      </div>
    );
  }
  
}

export default App;
