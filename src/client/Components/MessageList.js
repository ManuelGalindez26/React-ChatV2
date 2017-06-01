import React from 'react';
import uid from 'uid';

export default function MessageList (props){
  return <section id="MessageList" className="ListMessage">
    {
      props.messages.map((item) => {

        let id = uid()

        return <div key={id} className="Message">
          <figure className="avatar Message-avatar">
            <img title={ item.username } src={ item.avatar } width="40" height="40" />
          </figure>
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
  </section>
}
