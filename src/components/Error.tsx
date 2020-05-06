import React from 'react';
import { Link } from 'react-router-dom';
import type { FC } from 'react';

const Error: FC = () => (
  <div className='container'>
    <h1 className='text-center'>Something went wrong...</h1>
    <Link className='center btn-main' to='/'>
      Go Home
    </Link>
  </div>
);

export default Error;
