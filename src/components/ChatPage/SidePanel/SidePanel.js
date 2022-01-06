import React from 'react';
import ChatRooms from './ChatRooms';
import DirectMessages from './DirectMessage';
import Favorited from './Favorited';
import UserPanel from './UserPanel';

const SidePanel = () => {
  return (
    <div style={{ backgroundColor: '#7B83EB', padding: '2rem', minHeight: '100vh', color: 'white', minWidth: '275px' }}>
      <UserPanel />

      <Favorited />

      <ChatRooms />

      <DirectMessages />
    </div>
  );
};

export default SidePanel;
