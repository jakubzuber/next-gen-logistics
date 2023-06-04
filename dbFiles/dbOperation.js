const config = require('./dbConfig')
const sql = require('mssql')

const validateLogIn = async (USERNAME) => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        select 
        PASSWORD, ONE_TIME_PASSWORD
        from USERS 
        where LOGIN = '${USERNAME}'
        and USER_FOR = 1
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const setNewPasswrod = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        update USERS
        set PASSWORD = '${data.PASSWORD}',
            ONE_TIME_PASSWORD = 0
        where LOGIN = '${data.USERNAME}'
        and USER_FOR = 1
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const getNewOrdersData = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT * FROM PRZYJECIA
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const getClientList = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT ID, SYMBOL FROM KLIENCI
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const setNewOrder = async ({newOrder, data}) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        INSERT INTO PRZYJECIA ( ID, KLIENT_ID, NR_WLASNY, ILOSC, WAGA, NADAWCA, KOD_POCZTOWY, MIEJSCOWOSC, ADRES, KRAJ, DANE_AUTA)
        VALUES (
		3,
        ${newOrder.client},
        '${newOrder.nr}',
        ${newOrder.number},
        ${newOrder.weight},
        '${newOrder.nadawca}',
        '${newOrder.kod}',
        '${newOrder.miejscowosc}',
        '${newOrder.adres}',
        '${newOrder.kraj}',
        '${newOrder.dane}'
        )
        
        
        `)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = {
    validateLogIn,
    setNewPasswrod,
    getNewOrdersData,
    getClientList,
    setNewOrder
};