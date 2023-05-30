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

app.post('/valideLogIn', async(req,res) => {
    const result = await dbOperation.validateLogIn(req.body.USERNAME);
    res.send(result.recordset)
});

app.post('/valideLogIn/newPasswrod', async(req,res) => {
    dbOperation.setNewPasswrod(req.body)
    res.status(200).json({ success: true })
});

app.get('/apiFetchNewOrders', async(req, res) => {
    const result = await dbOperation.getNewOrdersData(req.body);
    res.send(result.recordset)
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))

