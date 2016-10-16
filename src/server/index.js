import express from 'express';
import engine from 'react-engine';
import path from 'path';


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

app.listen(port, () => console.log(`Server listen in localhost ${port}`));
