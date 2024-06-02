const dotenv = require('dotenv');
const {server,app} = require("./connection/socket.connect")
const express = require('express')
dotenv.config({ path: "./config/config.env" });




const path = require('path');
app.use(express.static(path.join(__dirname,'../client/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
})






module.exports = server;