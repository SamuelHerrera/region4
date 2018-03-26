var async = require('asyncawait/async');
var await = require('asyncawait/await');
var nodemailer = require('nodemailer');

var ClientService = require('../services/client.service');

var mailgun = require('mailgun.js');
var mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-02b06c51f11de490dbad81b5b63e6da8'
});

_this = this;

exports.getClients = async (function (req, res, next) {

  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var query = req.query ? req.query : {};
  try {
    var todos = await (ClientService.getClients(query, page, limit));
    return res.status(200).json({
      status: 200,
      data: todos,
      message: "Succesfully Client Recieved"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.createClient = async (function (req, res, next) {
  try {

    var createdClient = await (ClientService.createClient(req.body));
    // var mailOptions = {
    //   from: 'usuario@valorinmuebles.com.mx',
    //   to: createdClient.mail,
    //   subject: 'Activar mi cuenta de Region4',
    //   text: 'Use el código ' + createdClient.activationCode + ' para activar su cuenta en http://itexsolutions.com.mx/activacion'
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    mg.messages.create('valorinmuebles.com.mx', {
        from: "Valor Inmuebles <usuario@valorinmuebles.com.mx>",
        to: [createdClient.mail],
        subject: 'Activar mi cuenta de Valor Inmuebles',
        html: `
        <html >
        <head>
        </head>
        <body>
            <div class="mainContainer" style="width:100%; display:inline-block; ">
                <div class="superTitle" style="background: #28225c; width: 100%; display: inline-block;">
                  <div class="superContainer" style="padding-bottom: 10px; padding-top:10px;  width:100%; display: inline-block;">
                    <a href="#" style="margin: 15px;">
                      <img class="logo" src="https://valorinmuebes.herokuapp.com/assets/images/logo_.png" />
                    </a>
                  </div>
                </div>
                <div class="container2" style=" text-align: left; width: 100%; display: inline-block;">
                  <div style="    text-align: left; width: 100%; display: inline-block; ">
                    <h1 style="padding-top:20px; padding-bottom:20px; font-size:25px; font-weight:400;">Apreciable ${createdClient.name}</h1>
                    <h3 style="text-align:justify;">Hemos recibido tu solicitud de registro, te pedimos que sigas las 
                      instrucciones a continuación para la activación de tu cuenta.
                      </h3>
                  </div>
                  <div style="text-align: left;  width: 100%; display: inline-block; padding-top:20px; padding-bottom: 20px;">
                      Ingresa a nuestra página: http://www.valorinmuebles.com.mx/activacion <br>
                      Usa el código de activación: ${createdClient.activationCode}
                  </div>
            
                  <div style="    text-align: left;
                  width: 100%;
                  display: inline-block;">
                    <span>No respondas a este correo, si requieres más información. Contáctanos al ventas@region4.mx .
                    </span>
            
                  </div>
            
                  <div style="text-align: center;
                  width: 100%;
                  display: inline-block;">
                    <h3>
                      <a href="#">Terms</a> |
                      <a href="#">Privacy</a>
                      <!-- | -->
                      <!-- <a href="#">Unsubscribe</a> -->
                    </h3>
                  </div>
                </div>
              </div>
        </body>
        </html>`,
        // text: 'Use el código ' + createdClient.activationCode + ' para activar su cuenta en http://www.valorinmuebles.com.mx/activacion'
      })

      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)); // logs any error
    return res.status(200).json({
      status: 200,
      data: createdClient,
      message: "Succesfully Created Client"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error registrando cliente: " + e
    });
  }
});

exports.activateClient = async (function (req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      status: 400,
      message: "Clave must be present"
    });
  }
  try {
    var updatedClient = await (ClientService.activateClient(req.body.clave));
    if (updatedClient) {
      return res.status(200).json({
        status: 200,
        data: updatedClient,
        message: "Succesfully Activated Client"
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Clave de activacion incorrecta"
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.loginClient = async (function (req, res, next) {
  if (!req.body.user || !req.body.pass) {
    return res.status(400).json({
      status: 400,
      message: "mail and password must be present"
    });
  }
  try {
    var loginClient = await (ClientService.loginClient(req.body.user, req.body.pass));

    if (loginClient) {
      if (loginClient.status == "active") {
        loginClient.password = "****";
        return res.status(200).json({
          status: 200,
          data: loginClient,
          message: "Inicio de sesion correcto"
        });
      } else {
        return res.status(201).json({
          status: 400,
          message: "Cuenta no activada"
        });
      }

    } else {
      return res.status(201).json({
        status: 400,
        message: "Datos de inicio de sesion incorrectos"
      });
    }


  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.updateClient = async (function (req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({
      status: 400,
      message: "Id must be present"
    });
  }
  try {
    var updatedClient = await (ClientService.updateClient(req.body));
    return res.status(200).json({
      status: 200,
      data: updatedClient,
      message: "Succesfully Updated Client"
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
});

exports.removeClient = async (function (req, res, next) {
  var id = req.params.id;
  try {
    var deleted = await (ClientService.deleteClient(id))
    return res.status(204).json({
      status: 204,
      message: "Succesfully Client Deleted"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }

});
