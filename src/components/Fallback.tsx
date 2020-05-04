import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

const Fallback: FC = () => <Redirect to='/' />;

export default Fallback;
