import React from 'react';
import './Skeleton.css';

const Skeleton = () => {
  return (
    <div className='skeleton'>
      <div className='skeleton-avator' />
      <div className='skeleton-author' />
      <div className='skeleton-description' />
    </div>
  );
};

export default Skeleton;
