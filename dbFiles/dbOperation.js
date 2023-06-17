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
        SELECT
        K.NAZWA KLIENT_NAZWA,
		concat(convert(varchar, P.OBSLUGA_START, 32),' ', convert(varchar, P.OBSLUGA_START, 24)) OBSLUGA_START,
		concat(convert(varchar, P.OBSLUGA_KONIEC, 32),' ', convert(varchar, P.OBSLUGA_KONIEC, 24)) OBSLUGA_KONIEC,
		P.ID,
		KLIENT_ID,
		ILOSC,
		WAGA,
		NADAWCA,
		KOD_POCZTOWY,
		MIEJSCOWOSC,
		ADRES,
		KRAJ,
		UWAGI,
		DANE_AUTA,
		OBSLUGA
        FROM PRZYJECIA1 P CROSS APPLY
				(
				SELECT TOP 1
				K.NAZWA
				FROM KLIENCI K
				WHERE K.ID = P.KLIENT_ID
				) K
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const getNewOrdersDetailsData = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT * FROM PRZYJECIA_SZCZEGOLY
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
        SELECT * FROM KLIENCI
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const getWhWorkers = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT ID_USER, CONCAT(NAME, ' ', SURNAME) SYMBOL FROM USERS WHERE USER_FOR = 2
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const setNewOrder = async ({ newOrder, data }) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`

        INSERT INTO PRZYJECIA1 (KLIENT_ID, ILOSC, WAGA, NADAWCA, KOD_POCZTOWY, MIEJSCOWOSC, ADRES, KRAJ, DANE_AUTA)
        VALUES (
        ${newOrder.client},
        ${newOrder.number},
        ${newOrder.weight},
        '${newOrder.nadawca}',
        '${newOrder.kod}',
        '${newOrder.miejscowosc}',
        '${newOrder.adres}',
        '${newOrder.kraj}',
        '${newOrder.dane}'
        )

        DECLARE @ID_PRZYJECIA INT = (SELECT TOP 1 ID FROM PRZYJECIA1 WHERE KLIENT_ID = ${newOrder.client} ORDER BY ID DESC)
        
        INSERT INTO PRZYJECIA_SZCZEGOLY (PRZYJECIE_ID, KOD_PRODUKTU, NAZWA_PRODUKTU, ILOSC, WAGA, PAKOWANIE, UWAGI) VALUES 
            ${data.map(a => `( @ID_PRZYJECIA, '${a.KOD_PRODUKTU}', '${a.NAZWA_PRODUKTU}', ${a.ILOSC},${a.WAGA},'${a.PAKOWANIE}','${a.UWAGI}')`)}
        `)
    }
    catch (error) {
        console.log(error)
    }
};


const setWorkerToOrder = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        update PRZYJECIA1
        set OBSLUGA = '${data.idWorker}',
            OBSLUGA_START = GETDATE()
        where ID = '${data.idOrder}'
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const clearWorkerFromOrder = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        update PRZYJECIA1
        set OBSLUGA = null,
            OBSLUGA_START = null
        where ID = ${data.idOrder}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const deleteOrder = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        delete from PRZYJECIA1
        where ID = ${data.idOrder}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const getWhPlaces =  async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        select * from WH_PLACES
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const setNewPlaces = async ({ data }) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`

        INSERT INTO WH_PLACES (KOD_KRESKOWY, OPIS, KOD) VALUES 
        ${data.map(a => `('${a.symbol}', '${a.discription}', CONCAT('${a.symbol}',333))`)}
        `)
    }
    catch (error) {
        console.log(error)
    }
};

const deletePlace = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        delete from WH_PLACES
        where ID = ${data.idPlace}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const getWhCarriers =  async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        select * from WH_CARRIERS
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const setNewCarriers = async ({ data }) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        declare @counter int = ${data}
  
        while @counter > 0
        begin 
	        insert into WH_CARRIERS (KOD_KRESKOWY)
	        values (convert(numeric(12,0),rand() * 899999999999) + 100000000000)
	        set @counter = @counter - 1
        end
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
    setNewOrder,
    getWhWorkers,
    setWorkerToOrder,
    getNewOrdersDetailsData,
    clearWorkerFromOrder,
    deleteOrder,
    getWhPlaces,
    setNewPlaces,
    deletePlace,
    getWhCarriers,
    setNewCarriers
};