import React from 'react';
import logos from '../assets/logos';
import type { FC } from 'react';

type TeamLogoProps = {
  id: string;
};

const TeamLogo: FC<TeamLogoProps> = ({ id }) => {
  return (
    <svg
      className='center'
      width={200}
      x='0px'
      y='0px'
      viewBox='0 0 125.397 125.397'
    >
      {logos[id]}
    </svg>
  );
};

export default TeamLogo;
