import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Discussions from './Discussions';


export default class ConversationUser extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      active: false,
      username: "",
      avatar: ""
    }

    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        active : true
      })
    },1)
  }

  _onChange(input) {
    const setValue = {};
    setValue[input.target.name] = input.target.value;
    console.log(setValue);
    this.setState(setValue);
  }

  _onSubmit(ev) {
    ev.preventDefault();

    let name, avatar;

    if ( this.state.username === '' ) {
      name = 'Anonimo';
    } else {
      name = this.state.username;
    }

    if ( this.state.avatar === '' ) {
      avatar = 'https://static.platzi.com/media/avatares/default.png';
    } else {
      avatar = this.state.avatar;
    }

    const defaultValues = {
      username: name,
      avatar: avatar
    };

    this.setState(defaultValues);

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('conversation'));
      ReactDOM.render(<Discussions
        username={this.state.username}
        avatar={this.state.avatar} />,
        document.getElementById('conversation'));
    },300)

  }

  render(){

    let form;

    if ( this.state.active ) {
      form = <form onSubmit={this._onSubmit} className="conversationUser">
        <label className="labelA">Insert you username</label>
        <input
          className="inputA"
          type="text"
          name="username"
          placeholder="Write you username"
          onChange={this._onChange} />
        <label className="labelA">Insert you avatar</label>
        <input
          className="inputA"
          type="text"
          name="avatar"
          placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unof.svg.png"
          onChange={this._onChange} />

        <input className="btn-sub" type="submit" value="Send"/>
      </form>

    } else {
      form = null
    }
    return <CSSTransitionGroup
      transitionName="opacity"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      { form }
    </CSSTransitionGroup>

  }

}
