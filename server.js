const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 4001;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/restaurant/:rid', express.static(path.join(__dirname, 'public')));

const overview = axios.create({
  baseURL: 'http://localhost:3001',
});

const reservations = axios.create({
  baseURL: 'http://localhost:3002',
});

const menu = axios.create({
  baseURL: 'http://localhost:3003',
});

const reviews = axios.create({
  baseURL: 'http://localhost:3004',
});

const overviewProxy = axios.create({
  baseURL: 'http://ec2-18-220-248-250.us-east-2.compute.amazonaws.com'
})

const menuProxy = axios.create({
  baseURL: 'http://ec2-13-52-98-101.us-west-1.compute.amazonaws.com'
})

const reviewsProxy = axios.create({
  baseURL: 'http://ec2-54-161-76-60.compute-1.amazonaws.com'
})


app.use('/api/restaurant/:rid', (req, res) => {
  overviewProxy.get(`/api/restaurant/${req.params.rid}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/api/restaurants/:id/reviews', (req, res) => {
  console.log('review request');
  reviewsProxy.get(`/api/restaurants/${req.params.id}/reviews`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/api/restaurants/:id/filters', (req, res) => {
  console.log('filter request');
  reviewsProxy.get(`/api/restaurants/${req.params.id}/filters`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/menu/:id’', (req, res) => {
  console.log('review request');
  menuProxy.get(`/menu/${req.params.id}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.listen(port, () => {
  console.log(`proxy server running at: http://localhost:${port}`);
});