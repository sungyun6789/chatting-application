import React from 'react';
import MainPanel from './MainPanel/MainPanel';
import SidePanel from './SidePanel/SidePanel';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChatRoom = useSelector((state) => state.chatRoom.currentChatRoom);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px' }}>
        <SidePanel key={currentUser && currentUser.uid} />
      </div>

      <div style={{ width: '100%' }}>
        <MainPanel key={currentChatRoom && currentChatRoom.id} />
      </div>
    </div>
  );
};

export default ChatPage;
