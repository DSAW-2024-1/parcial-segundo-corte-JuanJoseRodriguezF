const express = require('express');
const coinRoute = require('./routes/coin'); 
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser'); //permite acceder a los datos de la solicitud POST en req.body


const app = express();
const PORT = process.env.PORT || 2029;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/coin', coinRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.send('Made by Juan Jose Rodriguez');
});

app.get('/users', (req,res) => {
res.send('Bienvenido a la seccion de usuarios');
});

app.get('/*', (req, res) => {
    res.send('Bienvenido a la API');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});