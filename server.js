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

app.get('/apiFetchNewOrdersDetails', async(req, res) => {
    const result = await dbOperation.getNewOrdersDetailsData(req.body);
    res.send(result.recordset)
});

app.get('/fetchClients', async(req, res) => {
    const result = await dbOperation.getClientList(req.body);
    res.send(result.recordset)
});

app.get('/fetchWhWorkers', async(req,res) => {
    const result = await dbOperation.getWhWorkers(req.body)
    res.send(result.recordset)
});

app.post('/setNewOrder', async(req,res) => {
    dbOperation.setNewOrder(req.body)
    res.status(200).json({ success: true })
});

app.post('/setWorkerToOrder', async(req,res) => {
    dbOperation.setWorkerToOrder(req.body)
    res.status(200).json({ success: true })
});

app.post('/clearWorkerFromOrder', async(req,res) => {
    dbOperation.clearWorkerFromOrder(req.body)
    res.status(200).json({ success: true })
});

app.post('/deleteOrder', async(req,res) => {
    dbOperation.deleteOrder(req.body)
    res.status(200).json({ success: true })
});

app.post('/setNewPlaces', async(req,res) => {
    dbOperation.setNewPlaces(req.body)
    res.status(200).json({ success: true })
});

app.get('/apiGetWhPlaces', async(req,res) => {
    const result = await dbOperation.getWhPlaces(req.body)
    res.send(result.recordset)
});

app.post('/deletePlace', async(req,res) => {
    dbOperation.deletePlace(req.body)
    res.status(200).json({ success: true })
});

app.get('/apiGetWhCarriers', async(req,res) => {
    const result = await dbOperation.getWhCarriers(req.body)
    res.send(result.recordset)
});



app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))

