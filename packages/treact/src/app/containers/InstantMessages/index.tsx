import * as React from 'react';
import { Chat } from 'containers/Chat';
import { ChatList } from 'containers';
import { fetchChatList } from 'api/chatList';
import { asyncConnect } from 'redux-connect';
import { Updates } from 'helpers/Telegram/Updates';
const s = require('./style.css');

class InstantMessagesImpl extends React.Component<{}, {}> {
  public updates = Updates.getInstance();

  constructor(...args) {
    super(...args);
    this.updates.start(update => {
      console.log(update.getTypeName(), update);
    });
  }

  public render() {
    return (
      <div className={s.main}>
        <ChatList />
        <Chat />
      </div>
    );
  }
}

const InstantMessages = asyncConnect<IConnectedState, IConnectedActions, IOwnProps>([{
  promise: ({ store }) => store.dispatch(fetchChatList()),
}])(InstantMessagesImpl);

export { InstantMessages }