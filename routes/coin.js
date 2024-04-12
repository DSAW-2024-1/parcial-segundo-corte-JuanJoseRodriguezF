const express = require('express');
const axios = require('axios');

const router = express.Router(); //sistema de router
const coinCapApiUrl = 'https://api.coincap.io/v2';

router.get('/', (req, res) => {
  res.send('Digite una criptomoneda para saber su valor (ej:bitcoin)');
});

router.get('/:coinName', async (req, res) => {
  const coinName = req.params.coinName;
  try {
    const response = await axios.get(`${coinCapApiUrl}/assets/${coinName}`); //solicitud GET a una API externa utilizando Axios.
    const priceUsd = response.data.data.priceUsd;
    res.status(200).send(`El precio en dólares de ${coinName} para hoy es: $${priceUsd}`);
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send(`El nombre de moneda "${coinName}" no fue encontrado en la base de datos`);
    } else {
      res.status(500).send('Hubo un error');
    }
  }
});

module.exports = router;