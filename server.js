const express = require('express');
const coinRoute = require('./routes/coin'); //sistemas de rutas
const usersRoute = require('./routes/users'); //sistemas de rutas
const bodyParser = require('body-parser'); //permite acceder a los datos de la solicitud POST en req.body


const app = express();
const PORT = process.env.PORT || 2029; //puerto usado
app.use(bodyParser.urlencoded({ extended: true })); // permite que Express analice y haga disponibles los datos enviados desde formularios HTML

app.use(express.json()); //middleware responsable de analizar el cuerpo de las solicitudes entrantes con formato JSON y poner el resultado en req.body
app.use('/coin', coinRoute); //usa el archivo coin.js
app.use('/users', usersRoute); //usa el archivo users.js

app.get('/', (req, res) => {
  res.send('Made by Juan Jose Rodriguez'); //mensaje inicial
});

app.get('/users', (req,res) => {
res.send('Bienvenido a la seccion de usuarios');
});

app.get('/*', (req, res) => {
    res.send('Bienvenido a la API');  //lo muestra cuando marca un endpoint sin funciones
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); //iniciar server
});