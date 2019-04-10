const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/restaurant/:rid', express.static(path.join(__dirname, 'public')));

const overview = axios.create({
  baseURL: 'http://localhost:3001',
});

const menu = axios.create({
  baseURL: 'http://localhost:3002',
});

const reviews = axios.create({
  baseURL: 'http://localhost:3003',
});


app.use('/api/restaurant/:rid', (req, res) => {
  overview.get(`/api/restaurant/${req.params.rid}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/restaurant/:id/reviews', (req, res) => {
  reviews.get(`/restaurant/:id/reviews`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/', (req, res) => {
  reviews.get(`/restaurant/:id/filters`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.listen(port, () => {
  console.log(`proxy server running at: http://localhost:${port}`);
});