import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import type { FC } from 'react';
import type { Player } from '../interfaces';

type PlayerCardProps = {
  player: Player | undefined;
};

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  const { key } = useLocation();

  if (!player) {
    return <Redirect to='/players' />;
  }

  const { apg, avatar, name, number, position, ppg, rpg, spg, teamId } = player;

  return (
    <TransitionGroup component={null}>
      <CSSTransition appear in key={key} classNames='fade' timeout={400}>
        <div className='panel'>
          <img className='avatar' src={avatar} alt={`${name}'s avatar`} />
          <h1 className='medium-header'>{name}</h1>
          <h3 className='header'>#{number}</h3>
          <div className='row'>
            <ul className='info-list' style={{ marginRight: 80 }}>
              <li>
                Team
                <div>
                  <Link style={{ color: '#68809a' }} to={`/${teamId}`}>
                    {`${teamId[0].toUpperCase()}${teamId.slice(1)}`}
                  </Link>
                </div>
              </li>
              <li>
                Position<div>{position}</div>
              </li>
              <li>
                PPG<div>{ppg}</div>
              </li>
            </ul>
            <ul className='info-list'>
              <li>
                APG<div>{apg}</div>
              </li>
              <li>
                SPG<div>{spg}</div>
              </li>
              <li>
                RPG<div>{rpg}</div>
              </li>
            </ul>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PlayerCard;
