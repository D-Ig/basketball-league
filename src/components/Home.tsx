import React from 'react';
import { Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import useFetchTeamNames from '../hooks/useFetchTeamNames';
import type { FC } from 'react';

const Home: FC = () => {
  const { teamNames } = useFetchTeamNames();

  return (
    <div className='container'>
      <h1 className='large-header'>Hash History Basketball League</h1>
      <h3 className='header text-center'>Select a team</h3>
      <div className='home-grid'>
        {teamNames.map(teamName => (
          <Link key={teamName} to={`/${teamName}`}>
            <TeamLogo id={teamName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
