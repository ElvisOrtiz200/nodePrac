const http = require('node:http') // crear constante con node:http

const desiredPort = process.env.PORT ?? 1234 //establecer el puerto donde se ejecutara nuestro proyecto

let numero = 0;

const processRequest = ((req, res) =>{
    if(req.url === '/'){
        res.statusCode = 200
        res.setHeader('Content-Type','text/html; charset=utf-8')

        res.end('Bienvenido a mi página')
    }
    else if(req.url === '/contacto'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end('Bienvenido CONTACTO')
    }
    else {
        res.statusCode = 400
        res.end('404')
    }
})

const server = http.createServer(processRequest);

server.listen(desiredPort, () =>{
    console.log(`server listening on port http://localhost:${desiredPort}`)//
})







