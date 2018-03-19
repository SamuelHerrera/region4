const express = require('express');
const router = express.Router();
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

// var ToDoController = require('../controllers/todo.controller');
// router.get('/users', ToDoController.getTodos);
// router.post('/users', ToDoController.createTodo);
// router.put('/users', ToDoController.updateTodo);
// router.delete('/users:id', ToDoController.removeTodo);

var ClientController = require('../controllers/client.controller');
router.get('/client', ClientController.getClients);
router.post('/client', ClientController.createClient);
router.put('/client', ClientController.updateClient);
router.put('/client/activate', ClientController.activateClient);
router.post('/client/login', ClientController.loginClient);
router.delete('/client:id', ClientController.removeClient);

var YalsController = require('../controllers/yals.controller');
router.post('/yals', YalsController.createReport);
router.get('/yals', YalsController.getReport);


module.exports = router;
