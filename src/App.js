import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
  );

function App() {
  return(
    <BrowserRouter>
      <Switch>
        {/* 
        for router without "exact" attribute every route is basically a "/" path, because every path starts this way, so every link will be homepage. To avoid this it can either be moved to the bottom of route check queue to have the least priority or treated with "exact" attribute to check if whole query string is equal to http:blabla/ if there is something after / the exact attribute will return false and therefor react router will not display this page 
        */}
        <Route exact path='/'>
          <Homepage />
        </Route>

        <Route path='/shop/hats'>
          <HatsPage />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}

export default App;