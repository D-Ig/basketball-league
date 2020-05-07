import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from './Loading';
import NavBar from './NavBar';
import type { FC } from 'react';

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
      <Suspense fallback={<Loading />}>
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
          <Route>
            <Fallback />
          </Route>
        </Switch>
      </Suspense>
    </div>
  </Router>
);

export default App;
