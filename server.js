const express = require('express');
const dbOperation = require('./dbFiles/dbOperation')
const cors = require('cors');


const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let sesion;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.post('/api', async (req, res)=> {
    const result = await dbOperation.getOrders(req.body)
    res.send(result.recordset)
}) 

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))

