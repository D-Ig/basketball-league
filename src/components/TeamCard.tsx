import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import useFetchTeam from '../hooks/useFetchTeam';

type TeamCardProps = {
  teamName: string | undefined;
};

const TeamCard: FC<TeamCardProps> = ({ teamName }) => {
  const { error, loading, team } = useFetchTeam(teamName);

  if (!team) {
    return null;
  }

  const { coach, established, id, manager, name } = team;

  return (
    <div className='panel'>
      {error && <h1>Some error occured</h1>}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div style={{ width: '100%' }}>
          <TeamLogo id={id} />
          <h1 className='medium-header'>{name}</h1>
          <ul className='info-list row'>
            <li>
              Established<div>{established}</div>
            </li>
            <li>
              Manager<div>{manager}</div>
            </li>
            <li>
              Coach<div>{coach}</div>
            </li>
          </ul>
          <Link className='center btn-main' to={`/${id}`}>
            {name} Team Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default TeamCard;
