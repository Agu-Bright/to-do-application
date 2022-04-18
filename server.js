const http = require('http');
var url = require('url');

// var server = http.createServer((req, res)=>{
//     req.setEncoding('utf-8')
//     req.on('data', (chunk)=>{       //DATA event are fired whenever a new chunk of daa has been read
//         console.log('parsed', chunk); //A chunk by default is a Buffer Object
//     });
//     req.on('end', function(){       //The end event is fired when ecerything has been read
//         console.log('done Parsing');
//         res.end()
//     })
// })

//CREATIN RESOURCES WITH POST REQUEST
var items = []
var server = http.createServer(function(req,res){
    switch(req.method){
        case 'POST':
            var item = '';
            req.setEncoding('utf-8');
            req.on('data', (chunk)=>{
                item += chunk
            });
            req.on('end', ()=>{
                items.push(item);
                res.end('ok\n')

            });
            break;

        case 'GET':
            items.forEach((item, i)=>{
                res.write(i +')' + item + '\n');
            });
            res.end();
            break;  

        case 'DELETE': 
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            
            if(isNaN(i)){
                res.statusCode = 400;
                res.end('Invalid item id')
            }else if(!items[1]){
                res.statusCode = 404;
                res.end('Item Not Found')
            }else{
                items.splice(i, 1);
                res.end('ok\n');
            }
            break;
    }
    
}).listen(5000, ()=>console.log('Server listening on port 5000'))

//FETCHING RESOURSE WITH GET REQUEST


