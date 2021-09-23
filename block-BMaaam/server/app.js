var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb:localhost/sample', (err) => {
  console.log(err ? err : 'database connected');
});

app.get('/', (req, res) => {
  res.send('welcome to express');
});

app.listen('4000', () => {
  console.log('server is listen on 3000');
});
