require("dotenv").config();
const express = require('express')
const {connectDB} = require('./config/db')
const PORT = process.env.PORT || 3000;
connectDB();

const app = express()

const {routes} = require('./routes/incident')

app.use("/api",routes)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})



// const port = 3000

// const {app} = require('./app')

// app.listen(port, () =>{
//     console.log(`Servidor corriendo en http://localhost:${port}`);
// })


