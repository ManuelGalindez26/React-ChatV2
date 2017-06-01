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
    this._Message = this._Message.bind(this);
    this.user = uid(10);
  }

  componentDidMount(){

    this.socket = io('http://localhost:3000');

    this.socket.on('message', (message) => {
      if (message.user !== this.user) {
        this._Message(message);
      }
    })

    const textValue = document.getElementById('textarea');
    textValue.addEventListener('keypress', event => {
      if ( event.keyCode === 13){
        this._dataValue(textValue);
        event.preventDefault();
      }
    })
  }

  _dataValue(valueMsj) {
    const avatar = this.props.avatar;
    const username = this.props.username;
    let message = { avatar: avatar, username: username, message: valueMsj.value };

    if ( valueMsj.value !== '' ) {
      this.socket.emit('new-message', message);
      Notification(message);
      valueMsj.value = '';
    }
  }

  _Message(message) {
    const contMessage = document.getElementById('MessageList');
    this.state.messages.push( message );
    let MessageGlobal = this.state.messages;
    this.setState({ messages: MessageGlobal });
    
    contMessage.scrollTop = contMessage.scrollHeight;
  }

  render(){
    return <section className="conversationBody">
      <div className="header-user">
        <figure className="avatar">
          <img src={this.props.avatar} width="30" height="30" />
        </figure>

        <h2 className="header-user-username">
          { `${this.props.username}` }
        </h2>
      </div>


      <MessageList
        messages={this.state.messages}/>

      <form className="Message-form" method="POST">
        <textarea
          id="textarea"
          rows="1"
          placeholder="Write message..."
          autoComplete="false"
          autoFocus="true"></textarea>
        <button type="submit">
          <i className="material-icons">send</i>
        </button>
      </form>

    </section>
  }
}
