const config = require('./dbConfig');
const sql = require('mssql');

const getOrders = async() => {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request().
        query('SELECT ID, CLIENT, LENGHT, WIDTH, HEIGHT, CAST(COLLECTION_DATE AS VARCHAR(50)) AS COLLECTION, CAST(DELIVEERY_DATE AS VARCHAR(50)) AS DELIVERY FROM ORDERS1')
        return orders
    }
    catch(error) {
        console.log(error)
    }
};

module.exports = {
    getOrders
} ;