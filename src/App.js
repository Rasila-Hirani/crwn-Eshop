import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import HomePage from './component/pages/homepage/homepage';
import Header from './component/header/header';
import ShopPage from './component/pages/shop/shop';
function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' component={HomePage} exact/>
        <Route path='/shop' component={ShopPage} />
      </Switch>
     
    </div>
  );
}

export default App;
