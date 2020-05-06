import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import TeamLogo from './TeamLogo';
import useFetchTeam from '../hooks/useFetchTeam';
import type { FC } from 'react';

type TeamCardProps = {
  teamName: string | undefined;
};

const TeamCard: FC<TeamCardProps> = ({ teamName }) => {
  const { loading, team } = useFetchTeam(teamName);

  if (!team) {
    return <Loading />;
  }

  const { coach, established, id, manager, name } = team;

  return (
    <div className='panel'>
      {loading ? (
        <Loading />
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
