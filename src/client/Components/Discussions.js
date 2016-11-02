import React from 'react';
import io from 'socket.io-client';
import uid from 'uid';
import MessageList from './MessageList';
import Notification from './Notification';

export default class Discussions extends React.Component {

  constructor(props){
    super(props)
    this.state = { messages: [] };
    this._dataValue = this._dataValue.bind(this);
    this._MessageSend = this._MessageSend.bind(this);
    this.user = uid(10);
  }

  componentDidMount(){

    this.socket = io('localhost:3000');

    this.socket.on('message', (message) => {
      if (message.user !== this.user) {
        this._MessageSend(message);
      }
    })
  }


  _dataValue(ev) {

    ev.preventDefault();

    let textValue = document.getElementById('textarea').value;

    const avatar = this.props.avatar;
    const username = this.props.username;
    let message = { avatar: avatar, username: username, message: textValue };

    if ( textValue !== '' ) {
      this.socket.emit('new-message', message);
      Notification(message);
      document.getElementById('textarea').value = '';
    }
  }

  _MessageSend(message) {
    this.state.messages.push( message );
    let MessageGlobal = this.state.messages;
    this.setState({ messages: MessageGlobal });
  }

  render(){
    return <div className="conversationBody">
      <header className="header-user">
        <h2 className="header-user-username">
          { `${this.props.username}` }
        </h2>

        <figure className="avatar">
          <img src={this.props.avatar} width="30" height="30" />
        </figure>
      </header>

      <section className="Message-list">
        <MessageList messages={this.state.messages} />
      </section>


      <form className="Message-form" method="POST">
        <textarea id="textarea" placeholder="Write message..."></textarea>
        <button type="submit" onClick={ this._dataValue }>Send</button>
      </form>

    </div>
  }
}
