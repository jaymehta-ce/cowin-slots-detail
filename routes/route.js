// route.js file 
const express = require("express");
const path = require('path');
var router = express.Router();
const { slots } = require('../util/slots.js');


router.get('/', (req, res) => {
   //slots(req, res);
  try{

   var options = {
        root: "./views/"
    };
    console.log(options);
    var fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
           global.socket.emit('counter', { data: ['123'] }); // This will emit the event to all connected sockets
  
            console.log('Sent:', fileName);
        }
    });
}
catch(e)
{
   throw e;
}
});
router.get('/slots', (req, res) => {
  //slots(req, res);
  try{

   var options = {
        root: "./views/"
    };
    console.log(options);
    var fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}
catch(e)
{
   throw e;
}
})

module.exports = router;