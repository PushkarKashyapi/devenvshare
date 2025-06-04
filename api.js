const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./exports/export.js');

const overview = fs.readFileSync(`${__dirname}/txt/overview.html` , 'utf-8');
const product = fs.readFileSync(`${__dirname}/txt/product.html` , 'utf-8');
const card = fs.readFileSync(`${__dirname}/txt/card.html` , 'utf-8');

const http = require('http');
const url = require('url');
const data = fs.readFileSync(`${__dirname}/txt/json.txt` , 'utf-8');

    const proddata = JSON.parse(data);
    const slug= proddata.map(el => slugify(el.productName , {lower:true}));
    console.log(slug);



// server // 
const  server = http.createServer((req , res) =>{

    // overview page // 
    const{query , pathname} = url.parse(req.url , true);
    
  
    if (pathname === '/overview'){
        res.writeHead(200 , {
            'Content-type': 'text/html'
        });

    
        
        

        const htmlcard = proddata.map(el => replaceTemplate(card , el)).join(' ');
        console.log(htmlcard);
        const output = overview.replace('{%PRODUCT_CARDS%}' , htmlcard);
        
        res.end(output);
    }
      // product page // 
      else if(pathname === '/product'){
       const tproduct = proddata[query.id];
       const output = replaceTemplate(product , tproduct);
       res.writeHead(200 , {
        "Content-type": 'text/html'

    });
    res.end(output);

        
      }
    
    if(pathname === '/api'){
        
            res.writeHead(200 , {
                'Content-type': 'application/json'
                
            });
            res.end(data);
        
    }
   
});

server.listen(4000 , '127.0.0.1' , ()=>{
    console.log('server is running ');
})