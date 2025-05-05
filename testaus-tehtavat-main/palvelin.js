import express from 'express';

import { laskeVertausluvut } from './vertausluku.js';

const app = express();

// koodia


app.get('/vertausluvut', (req, res) => {
  // ...
  const tulos = laskeVertausluvut(ehdokkaat);
  res.json(tulos);
});

app.listen(3000, () => {
  console.log('Palvelin käynnissä portissa 3000');
});