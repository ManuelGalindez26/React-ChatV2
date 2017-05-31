import React from 'react';
import uid from 'uid';

export default function MessageList (props){
  return <div>
    {
      props.messages.map((item) => {

        let id = uid()

        return <div key={id} className="Message">
          <figure className="avatar Message-avatar">
            <img title={ item.username } src={ item.avatar } width="40" height="40" />
          </figure>
          <h3 className="Message-username" >{ item.username }:</h3>
          <div className="Message-Body">
            <div>
              <p>
                { item.message }
              </p>
            </div>
          </div>
        </div>

      })
    }
  </div>
}
