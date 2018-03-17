const express = require('express');
const router = express.Router();
const _ = require('lodash');

var neo4j = require('neo4j-driver').v1; //driver.close();
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin"), {
  maxTransactionRetryTime: 30000
});
var session = driver.session();

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

// Get users
router.get('/users', (req, res) => {
  return session
    .run('match (n:person) return n')
    .subscribe({
      onNext: (record) => {
        response.data = record;
        res.json(response);
      },
      onCompleted: (headers) => {
        res.json("No Data Found");
        session.close();
      },
      onError: () => {
        sendError(error, res);
      }
    });
});

module.exports = router;
