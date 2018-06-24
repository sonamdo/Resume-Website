const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = (path.join(__dirname, '../public'));

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var nodemailer = require("nodemailer");

app.use(express.static(publicPath))

// Use Smtp Protocol to send Email

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('sendEmail',function(msg){
    // console.log('message' + msg.message)
    var transporter = nodemailer.createTransport({//placeholder information set for security reasons
        service: "Gmail",
        auth: {
            user: "placeholder"
            pass: "password goes here"
        }
    });

    var mail = {
        from:  msg.from + " from resume-website " + "<placeholder>",
        to: "placeholder",
        subject: msg.email,
        text: msg.message,
        html: msg.message,
    }

    transporter.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log(response);
        }

    });
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
