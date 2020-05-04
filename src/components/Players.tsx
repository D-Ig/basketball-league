import React, { FC, ReactElement } from 'react';
import { useLocation, useRouteMatch, Route } from 'react-router-dom';
// import React, { FC } from 'react';
// import { useLocation, useRouteMatch } from 'react-router-dom';
import slug from 'slug';
import PlayerCard from './PlayerCard';
import SideBar from './Sidebar';
import useFetchPlayers from '../hooks/useFetchPlayers';

const Players: FC = () => {
  const { pathname, search } = useLocation();
  const { path } = useRouteMatch();
  const { error, loading, players } = useFetchPlayers(search);

  // const match = useRouteMatch(`${path}/:playerId`);

  return (
    <div className='container two-column'>
      {error ? (
        <h1>Some error occured</h1>
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
                loading={loading}
              />
            )}
          />
          {/* {match ? (
            <PlayerCard
              loading={loading}
              player={players.find(
                ({ name }) => slug(name) === match.params.playerId,
              )}
            />
          ) : null} */}
        </>
      )}
    </div>
  );
};

export default Players;
