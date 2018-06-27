const express = require('express');
const router = express.Router();
var bluebird = require('bluebird');
var multer = require('multer');
var upload = multer();

var mongoose = require('mongoose');
mongoose.Promise = bluebird;

mongoose.connect('mongodb://heroku_2hq2rk0g:q0pnrr8p7tfu202pu9ge8n1a1e@ds221609.mlab.com:21609/heroku_2hq2rk0g')
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database`);
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database ${e}`);
  });

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
router.put('/yals', YalsController.recordReference);
router.post('/yals/configuracion', YalsController.setSettings);
router.get('/yals/configuracion', YalsController.getSettings);
router.post('/yals/sendEmail', YalsController.sendReport);
router.post('/yals/convert', YalsController.getImageFromUrlAsBase64);


var PagoFacilController = require('../controllers/pagofacil.controller');
router.post('/pagofacil', PagoFacilController.createPago);
router.get('/pagofacil', PagoFacilController.getPago);
router.put('/pagofacil', PagoFacilController.recordReference);
router.post('/processpaypal', PagoFacilController.createPagoPayPal);
router.get('/execute', PagoFacilController.executePagoPayPal);
router.get('/cancel', PagoFacilController.cancelPagoPayPal);

var MailController = require('../controllers/mail.controller');
router.post('/sendmail', MailController.sendMail);

var CuponController = require('../controllers/cupon.controller');
router.get('/cupon', CuponController.getCupon);
router.post('/cupon', CuponController.createCupon);
router.put('/cupon', CuponController.updateStatus);




module.exports = router;
