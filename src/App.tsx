import React, { lazy, Suspense } from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import MYPagination from './Compionent/MYPagination';



const About = lazy(() => import('./Compionent/About'));
const App: React.FC = () => {
  return (
    <div className="App" data-testid="app">
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MYPagination></MYPagination>
            </Route>

            <Route exact path="/about" component={About}>

            </Route>

           
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
