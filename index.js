require("dotenv").config();
 
const express = require('express')
const routes = require('./api/routes');
const app = express()

const {connectDB} = require('./config/db')
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/api',routes);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

  
