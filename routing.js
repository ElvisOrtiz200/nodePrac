const http  = require('node:http')

const processRequest = (req,res)=>{
    const {method, url} = req
    
}

const server = http.createServer(processRequest)

server.listen(1234, () =>{
    console.log('server listening')
})