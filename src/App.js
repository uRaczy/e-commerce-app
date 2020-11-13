import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utility';
import Toggle from './components/test/test.component';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });  
      }
      else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribeFromAuth();
  }, []);

  return(
    <BrowserRouter>
    <Header currentUser={currentUser}/>
      <Switch>
        {/* 
        for router without "exact" attribute every route is basically a "/" path, because every path starts this way, so every link will be homepage. To avoid this it can either be moved to the bottom of route check queue to have the least priority or treated with "exact" attribute to check if whole query string is equal to http:blabla/ if there is something after / the exact attribute will return false and therefor react router will not display this page 
        */}
        <Route path='/' component={Homepage} exact />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />

      </Switch>
    </BrowserRouter>
  )
}

export default App;