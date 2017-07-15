import * as React from 'react';
import { connect } from 'react-redux';

import { ChatFooter } from 'components/ChatFooter';
import { sendText } from 'redux/api/messages';
import { IDispatch, IStore } from 'redux/IStore';

type IState = {
  message: string,
};

type IProps = {
  selected: number,
  sendMessage(id: number, text: string): Promise<void>,
};

class ChatFooterContainer extends React.Component<IProps, IState> {
  public state = {
    message: '',
  };

  public onChange: React.ChangeEventHandler<HTMLInputElement> =
    e => this.setState({ message: e.target.value })

  public onSubmit = async () => {
    const { sendMessage, selected } = this.props;
    await sendMessage(selected, this.state.message);
    this.setState({ message: '' });
  }

  public render() {
    return (
      <ChatFooter
        value={this.state.message}
        change={this.onChange}
        submit={this.onSubmit} />
    );
  }
}

const mapState = (state: IStore) => ({ selected: state.selected.dialog });
const mapDispatch = (dispatch: IDispatch) => ({
  sendMessage: (id: number, text: string) => dispatch(sendText(id, text)),
});
const connected = connect(mapState, mapDispatch)<{}>(ChatFooterContainer);

export { connected as ChatFooter };
