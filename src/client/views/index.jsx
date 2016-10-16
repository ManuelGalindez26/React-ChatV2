import React from 'react';

export default function Index (props) {
  return <html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{ props.title }</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <section className="container">
      <div className="conversation-wrapper" id="conversation">

      </div>
    </section>
    <script src="bundle.js"></script>
  </body>
  </html>
}
