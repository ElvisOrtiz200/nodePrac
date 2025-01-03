require("dotenv").config();
const express = require('express')
const {connectDB} = require('./config/db')
const {routes} = require('./api/index')
const PORT = process.env.PORT || 3000;
connectDB();

const app = express()
app.use(express.json()); 
app.use('/api',routes);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

  
