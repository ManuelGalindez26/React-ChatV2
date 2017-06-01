import React from 'react';

export default function Index (props) {
  return <html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{ props.title }</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="shortcut icon" href="images/logo.png" />
  </head>
  <body>
    <section className="container">
      <div className="" id="conversation"></div>
    </section>
    <script src="bundle.js"></script>
  </body>
  </html>
}
