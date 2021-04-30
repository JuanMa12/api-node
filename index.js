'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

var express = require('express');
var server = require('http').Server(app);
var config_mongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(config.db,config_mongoose, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')
})

server.listen(config.port, () => {
  console.log(`API REST corriendo en http://localhost:${config.port}`)
})
