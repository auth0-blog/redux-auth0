const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer('AUTH0_SECRET', 'base64'),
  audience: 'AUTH0_CLIENT_ID'
});

var jedis = [
  {
    id: 1,
    name: 'Luke Skywalker',
    image: 'http://localhost:7000/images/luke-skywalker.jpg'
  },
  {
    id: 2,
    name: 'Anakin Skywalker',
    image: 'http://localhost:7000/images/anakin-skywalker.png'
  },
  {
    id: 3,
    name: 'Yoda',
    image: 'http://localhost:7000/images/yoda.png'
  },
  {
    id: 4,
    name: 'Obi-Wan Kenobi',
    image: 'http://localhost:7000/images/obi-wan-kenobi.jpg'
  },
  {
    id: 5,
    name: 'Mace Windu',
    image: 'http://localhost:7000/images/mace-windu.jpg'
  }
];

app.get('/api/jedis', (req, res) => {
  const allJedis = jedis.map(jedi => { 
    return { id: jedi.id, name: jedi.name }
  });
  res.json(allJedis);
});

app.get('/api/jedis/:id', authCheck, (req, res) => {
  res.json(jedis.filter(jedi => jedi.id === parseInt(req.params.id))[0]);
});

app.listen(7000);
console.log('Listening on http://localhost:7000');