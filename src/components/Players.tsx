import React from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import slug from 'slug';
import Error from './Error';
import PlayerCard from './PlayerCard';
import SideBar from './Sidebar';
import useFetchPlayers from '../hooks/useFetchPlayers';
import type { FC, ReactElement } from 'react';

const Players: FC = () => {
  const { pathname, search } = useLocation();
  const { path } = useRouteMatch();
  const { error, loading, players } = useFetchPlayers(search);

  return (
    <div className='container two-column'>
      {error ? (
        <Error />
      ) : (
        <>
          <SideBar
            title='Players'
            list={players.map(({ name }) => name)}
            isLoading={loading}
          />
          {!loading && pathname === '/players' && (
            <div className='sidebar-instruction'>Select a Player</div>
          )}
          <Route
            path={`${path}/:playerId`}
            render={({ match }): ReactElement => (
              <PlayerCard
                player={players.find(
                  ({ name }) => slug(name) === match.params.playerId,
                )}
              />
            )}
          />
        </>
      )}
    </div>
  );
};

export default Players;
