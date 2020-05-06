import React from 'react';
import { Redirect } from 'react-router-dom';
import type { FC } from 'react';

const Fallback: FC = () => <Redirect to='/' />;

export default Fallback;
