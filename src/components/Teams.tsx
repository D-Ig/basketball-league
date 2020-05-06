import React from 'react';
import { useLocation, useRouteMatch, Route } from 'react-router-dom';
import slug from 'slug';
import Error from './Error';
import SideBar from './Sidebar';
import TeamCard from './TeamCard';
import useFetchTeamNames from '../hooks/useFetchTeamNames';
import type { FC, ReactElement } from 'react';

const Teams: FC = () => {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const { error, loading, teamNames } = useFetchTeamNames();

  return (
    <div className='container two-column'>
      {error ? (
        <Error />
      ) : (
        <>
          <SideBar title='Teams' list={teamNames} isLoading={loading} />
          {!loading && pathname === '/teams' && (
            <div className='sidebar-instruction'>Select a Team</div>
          )}
          <Route
            path={`${path}/:teamId`}
            render={({ match }): ReactElement => (
              <TeamCard
                teamName={teamNames.find(
                  teamName => slug(teamName) === match.params.teamId,
                )}
              />
            )}
          />
        </>
      )}
    </div>
  );
};

export default Teams;
