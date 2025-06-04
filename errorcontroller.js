const AppError = require("./global");
const { stack } = require("./project1");

const dbcasterror = err =>{
    const message = `invalid ${err.name} and ${err.path}`
    return new AppError(message , 400)
}

const duplicatedb =err =>{
    const value = err.errmsg.match(/c/)
        console.log(value);

        const message = `duplicate values found : ${value}` 

}

const validatedub = err => {

    const error = Object.values(err.errors).map(el => el.message)

    const message = ` eror in object ${error.join('. ')}`
    return new AppError(message , 400)

}

const serdev = (err , res) =>{

    res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        stack : err.stack
    })
}

const serprod =(err , res) =>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
            
        })
    }
    else{

        console.error('unknown error' , err )
        res.status(500).json({
            status : 'fucked' ,
            message : "unkonow error caught"
        })
    }
}



module.exports = (err , req , res , next) =>{
    err.statusCode = err.statusCode || 500 , 
    err.status = err.status || 'error';

   
if(process.env.NODE_ENV === 'development'){
    
serdev(err, res)

} else if(process.env.NODE_ENV === 'production'){ 
   let error = {...err}

    
if(error.name=== 'casterror') 
    if(error.code ===11000)
        if(error.name = 'validationerror')
    error = dbcasterror(error)
    error = duplicatedb(error)
    error = validatedub(error)
    serprod(err , res)
}
}


