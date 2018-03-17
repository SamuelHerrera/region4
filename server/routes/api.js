const express = require('express');
const router = express.Router();
const _ = require('lodash');
var bluebird = require('bluebird')

var mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://mongodb2.webrahost.com:27017/itexsolutions', {
    user: 'u1580',
    pass: 'PipU3MSXpPD2'
  })
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database`);
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database ${e}`);
  });

var ToDoController = require('../controllers/todo.controller');

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

router.get('/users', ToDoController.getTodos);

router.post('/users', ToDoController.createTodo);

router.put('/users', ToDoController.updateTodo);

router.delete('/users:id', ToDoController.removeTodo);

module.exports = router;
