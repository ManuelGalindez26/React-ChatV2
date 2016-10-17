import React from 'react';

export default function Discussions(props){
  return <div>
    <h1>
      { `${props.username}` }
    </h1>

    <img src={props.avatar} width="30" height="30" />

  </div>
}
