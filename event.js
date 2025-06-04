const http = require('http');
const eventemitter = require('events');


const myevents = new eventemitter();



myevents.on('pencho' , ()=>{
    console.log("there is pencho1");
    
})
myevents.on('pencho' , ()=>{
    console.log("there is pencho2");
    
})
myevents.on('pencho' , ()=>{
    console.log("there is pencho3");
    
})
myevents.emit('pencho');

console.log("hello");

const server = http.createServer();

server.on("request" , (req , res) =>{
    console.log("server connected ")
    res.end("server connected");
})
server.listen(8000 , '127.0.0.1' , ()=>{
    console.log("listening");
})
