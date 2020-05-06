import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

type LoadingProps = {
  message?: string;
};

const Loading: FC<LoadingProps> = ({ message = 'Loading' }) => {
  const [text, setText] = useState(message);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(t => (t === `${message}...` ? message : `${t}.`));
    }, 400);
    return (): void => clearInterval(intervalId);
  }, [message]);

  return (
    <div className='container'>
      <p className='text-center'>{text}</p>
    </div>
  );
};

export default Loading;
