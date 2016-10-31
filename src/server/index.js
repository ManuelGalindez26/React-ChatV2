import express from 'express';
import http from 'http';
import engine from 'react-engine';
import path from 'path';
import sckengine from 'socket.io';


const port = process.env.PORT || 3000;
const app = express();

//Rutas para los archivos estaticos
app.use(express.static(path.join(__dirname, '../../public')))

//definimos el engine ara archivos jsx
app.engine('.jsx', engine.server.create());

//Configuramos las rutas de las vistas
app.set('views', path.join(__dirname, '../client/views'));

//Indicamos que el engine a usar es el de archivos .jsx
app.set('view engine', 'jsx');

//Indicamos que use react-engine como engine de nuestras vistas
app.set('view', engine.expressView);

app.get('/', (req, res) => res.render('index', { title: 'Chat using React.js' }));

let server = http.createServer(app).listen(port, () => console.log(`Server listen in localhost ${port}`) )

const io = sckengine.listen(server);

let contUser = 0;

io.on('connection', (socket) => {

  ++contUser;
  console.log(`New user connect ${socket.id}, users connect: ${contUser}`);

  socket.on('new-message', (msg) => {
    io.emit('message', msg);
  })

  socket.on('disconnect', () => {
    --contUser;
    console.log(`New user disconnect ${socket.id}, users connect: ${contUser}`);

  })

})
