import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';

const Articles = lazy(() => import('./Articles'));
const Fallback = lazy(() => import('./Fallback'));
const Home = lazy(() => import('./Home'));
const Players = lazy(() => import('./Players'));
const Teams = lazy(() => import('./Teams'));
const TeamPage = lazy(() => import('./TeamPage'));

const App: FC = () => (
  <Router>
    <div>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/players'>
            <Players />
          </Route>
          <Route path='/teams'>
            <Teams />
          </Route>
          <Route path='/:teamId' exact>
            <TeamPage />
          </Route>
          <Route path='/:teamId/articles'>
            <Articles />
          </Route>
          {/* fix, not working */}
          <Route component={Fallback} />
        </Switch>
      </Suspense>
    </div>
  </Router>
);

export default App;
