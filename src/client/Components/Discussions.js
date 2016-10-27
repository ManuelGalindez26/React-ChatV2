import React from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';


export default class Discussions extends React.Component {

  constructor(props){
    super(props)
    this.state = { messages: [] };
    this._dataValue = this._dataValue.bind(this);
    this._MessageSend = this._MessageSend.bind(this);
  }

  componentDidMount(){
    this.socket = io('localhost:3000');
  }

  _dataValue(text) {
    let textValue = text.target.value;
    const avatar = this.props.avatar;
    const username = this.props.username;

    let message = { avatar: avatar, username: username, message: textValue };
    this.state.messages.push( message );
  }

  _MessageSend(ev) {
    ev.preventDefault();
    let MessageGlobal = this.state.messages;

    for ( let cont = 0; cont <= MessageGlobal.length -1; cont++) {
      if ( cont === MessageGlobal.length -1 ) {
        let dataMessage = [ MessageGlobal[cont] ];
        this.setState({ messages: dataMessage })
      }
    }
    document.getElementById('textarea').value = '';
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
        <textarea id="textarea" placeholder="Write message..." onChange={this._dataValue}></textarea>
        <button type="submit" onClick={ this._MessageSend }>Click</button>
      </form>

    </div>
  }
}
