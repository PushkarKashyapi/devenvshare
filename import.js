 
 // modules // 
const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path : './config.env'})
const tourmodel = require('./tourmodel')
const express = require('express');
const review = require('./review');


const app = new express()




// mongoconnection // 
const db = process.env.DATABASE;
mongoose.connect(db , {
    useNewUrlParser : true,
    useCreateIndex : true , 
    useFindAndModify : false
}).then(( ) => console.log("connected succesfully "))

// schema and model // 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data1/tours.json`))


const imptour = async() =>{
    try{
        await tourmodel.create(tours)
       
        console.log("data loaded")

    } catch(err){
console.log(err)
    }
}

const impreview = async() =>{
    try{
        await review.create(reviews)
        console.log("reviews loaded")
    } catch(err){
        console.log(err)
    }
}

const dlttour= async() =>{
    try{
        await tourmodel.deleteMany()
        console.log("data deleted")

    } catch(err){
console.log(err)
    }
}

if(process.argv[2] === 'import' ){
    imptour()
    

}
else if(process.argv[2]==='delete'){
    dlttour()
}

else if(process.argv[2]==='review'){
    impreview()
   
}

console.log(process.argv) 

// network connection // 
const port = 5000
app.listen(port , ()=>{
    console.log(`port is working on ${port}`)
})

console.log(process.env.PORT)

console.log(process.argv)

