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
        ${newOrder.KLIENT_ID},
        ${newOrder.ILOSC},
        ${newOrder.WAGA},
        '${newOrder.NADAWCA}',
        '${newOrder.KOD_POCZTOWY}',
        '${newOrder.MIEJSCOWOSC}',
        '${newOrder.ADRES}',
        '${newOrder.KRAJ}',
        '${newOrder.DANE_AUTA}'
        )

        DECLARE @ID_PRZYJECIA INT = (SELECT TOP 1 ID FROM PRZYJECIA1 WHERE KLIENT_ID = ${newOrder.KLIENT_ID} ORDER BY ID DESC)
        
        INSERT INTO PRZYJECIA_SZCZEGOLY (PRZYJECIE_ID, KOD_PRODUKTU, NAZWA_PRODUKTU, ILOSC, WAGA, PAKOWANIE, UWAGI, KOD_KRESKOWY) VALUES 
            ${data.map(a => `( @ID_PRZYJECIA, '${a.KOD_PRODUKTU}', '${a.NAZWA_PRODUKTU}', ${a.ILOSC},${a.WAGA},'${a.PAKOWANIE}','${a.UWAGI}', ${a.KOD_KRESKOWY})`)}
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

        delete from PRZYJECIA_SZCZEGOLY
        WHERE PRZYJECIE_ID = ${data.idOrder}

        delete from STANY_MAGAZYNOWE
        where PRZYJECIE_ID = ${data.idOrder} AND W_TRAKCIE = 1
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

        declare @session int = CAST(RAND() * 1000000 AS INT)

        drop table if exists #tmp

        create table #tmp (
            kodK varchar(200),
            opis varchar(400),
            kod varchar(200),
            kol int,
        )

        insert into #tmp (kodk, opis, kod, kol) values
        ${data.map(row => 
            `('${row.symbol}', '${row.discription}', convert(numeric(12,0),rand() * 899999999999) + 100000000000, ${row.place})`    
        )}

        insert into tmp_wh_places (OPIS, OPIS_DOD, KOD, KOL, COUNT, SESSION)
        select
        kodK,
        opis,
        kod,
        kol,
        ROW_NUMBER() OVER(ORDER BY kod DESC),
        @session
        from #tmp

        declare @counter int = (select top 1 COUNT from tmp_wh_places where SESSION = @session order by COUNT desc)

        while @counter > 0
        begin
            update WH_PLACES
            set KOLEJNOSC = KOLEJNOSC + 1
            where KOLEJNOSC >= (select top 1 KOL from tmp_wh_places where COUNT = @counter and SESSION = @session)

            insert into WH_PLACES (KOD_KRESKOWY, OPIS, KOD, KOLEJNOSC)
            select
            OPIS,
            OPIS_DOD,
            KOD,
            KOL
            from tmp_wh_places
            where COUNT = @counter and SESSION = @session

            set @counter = @counter - 1
        end

        delete from tmp_wh_places
        where SESSION = @session
        
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

        declare @kolToRemove int = (select kolejnosc from WH_PLACES where id = ${data.idPlace})
        
        delete from WH_PLACES
        where ID = ${data.idPlace}

        update WH_PLACES
        set kolejnosc = kolejnosc - 1
        where kolejnosc > @kolToRemove

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
        select
        WC.ID,
        WC.KOD_KRESKOWY,
        WP.OPIS
        FROM WH_CARRIERS WC LEFT JOIN WH_PLACES WP ON WC.PLACE_ID = WP.ID
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

const deleteCarrier = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        delete from WH_CARRIERS
        where ID = ${data.idCarrier}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const apiFetchStocks =  async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT
        [KOD_PRODUKTU]
        ,[NAZWA_PRODUKTU]
        ,SUM([ILOSC]) ILOSC
        ,[KLIENT_ID]
        ,[KLIENT_NAZWA]
        ,[W_TRAKCIE]
        ,[KOD_KRESKOWY]
        FROM [NEXT_GEN_SQL].[dbo].[STANY_MAGAZYNOWE]
        GROUP BY KOD_PRODUKTU, NAZWA_PRODUKTU, KLIENT_ID, KLIENT_NAZWA, W_TRAKCIE, KOD_KRESKOWY
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const apiFetchStocksDetails =  async ({kod}) => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT
	        [ID]
            ,[PALETA_NUMER]
            ,[KOD_PRODUKTU]
            ,[NAZWA_PRODUKTU]
            ,[ILOSC]
            ,[WAGA]
            ,[KLIENT_ID]
            ,[KLIENT_NAZWA]
            ,[W_TRAKCIE]
            ,[PRZYJECIE_ID]
            ,[KOD_KRESKOWY]
        FROM [NEXT_GEN_SQL].[dbo].[STANY_MAGAZYNOWE]
        WHERE KOD_PRODUKTU = '${kod}'
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const apiFetchRelesesOrders = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT
        K.NAZWA KLIENT_NAZWA,
		concat(convert(varchar, P.OBSLUGA_START, 32),' ', convert(varchar, P.OBSLUGA_START, 24)) OBSLUGA_START,
		concat(convert(varchar, P.OBSLUGA_KONIEC, 32),' ', convert(varchar, P.OBSLUGA_KONIEC, 24)) OBSLUGA_KONIEC,
		P.ID,
		KLEINT_ID,
		ILOSC,
		WAGA,
		ODBIORCA,
		KOD_POCZTOWY,
		MIEJSCOWOSC,
		ADRES,
		KRAJ,
		DANE_AUTA,
		OBSLUGA
        FROM WYDANIA P CROSS APPLY
				(
				SELECT TOP 1
				K.NAZWA
				FROM KLIENCI K
				WHERE K.ID = P.KLEINT_ID
				) K
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const fetchNewRelesesDetails = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT * FROM WYDANIA_SZCZEGOLY
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const setNewRelese = async ({ newOrder, data }) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`

        INSERT INTO WYDANIA (KLEINT_ID, ILOSC, WAGA, ODBIORCA, KOD_POCZTOWY, MIEJSCOWOSC, ADRES, KRAJ, DANE_AUTA)
        VALUES (
        ${newOrder.KLIENT_ID},
        ${newOrder.ILOSC},
        ${newOrder.WAGA},
        '${newOrder.ODBIORCA}',
        '${newOrder.KOD_POCZTOWY}',
        '${newOrder.MIEJSCOWOSC}',
        '${newOrder.ADRES}',
        '${newOrder.KRAJ}',
        '${newOrder.DANE_AUTA}'
        )

        DECLARE @ID_WYDANIA INT = (SELECT TOP 1 ID FROM WYDANIA WHERE KLEINT_ID = ${newOrder.KLIENT_ID} ORDER BY ID DESC)
        
        INSERT INTO WYDANIA_SZCZEGOLY (WYDANIE_ID, KOD_PROCUKTU, NAZWA_PRODUKTU, ILOSC, WAGA, PAKOWANIE, UWAGI, KOD_KRESKOWY) VALUES 
            ${data.map(a => `( @ID_WYDANIA, '${a.KOD_PRODUKTU}', '${a.NAZWA_PRODUKTU}', ${a.ILOSC},${a.WAGA},'${a.PAKOWANIE}','${a.UWAGI}', ${a.KOD_KRESKOWY})`)}
        `)
    }
    catch (error) {
        console.log(error)
    }
};

const setWorkerToRelese = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        update WYDANIA
        set OBSLUGA = '${data.idWorker}',
            OBSLUGA_START = GETDATE()
        where ID = '${data.idOrder}'
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const clearWorkerFromRelese = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        update WYDANIA
        set OBSLUGA = null,
            OBSLUGA_START = null
        where ID = ${data.idOrder}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const deleteRelese = async (data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`

        if exists (select 1 from WYDANIA_POZYCJE where WYDANIE_ID = ${data.idOrder})
            begin
	            select 
	            ROW_NUMBER() OVER(ORDER BY id DESC) pozycje,
	            *
	            into #tmp
	            from WYDANIA_POZYCJE 
	            where WYDANIE_ID = ${data.idOrder}

	            declare @counter int = (select top 1 pozycje from #tmp order by pozycje desc)

	            while @counter > 0
		            begin
			            if exists (select 1 from STANY_MAGAZYNOWE where id = (select top 1 hist_whPlace from #tmp where pozycje = @counter))
                            begin
                                update sm
                                set sm.ILOSC = sm.ILOSC + (select ILOSC from #tmp where pozycje = @counter)
                                from STANY_MAGAZYNOWE sm
                                where sm.ID = (select top 1 hist_whPlace from #tmp where pozycje = @counter)
                            end 
			            else
				            begin
					            insert into STANY_MAGAZYNOWE (PALETA_NUMER, KOD_PRODUKTU, NAZWA_PRODUKTU, ILOSC, WAGA, KLIENT_ID, KLIENT_NAZWA, W_TRAKCIE, KOD_KRESKOWY)
					            select
					            hist_oldPallet,
					            KOD,
					            NAZWA_PRODUKTU,
					            ILOSC,
					            1,
					            hist_klientId,
					            hist_klientNazwa,
					            0,
					            KOD_KREKOSWY_TOWARU
					            from #tmp
					            where pozycje = @counter 
				            end

                        set @counter = @counter - 1
		            end
            end

        delete from WYDANIA
        where ID = ${data.idOrder}

        delete from WYDANIA_POZYCJE
        WHERE WYDANIE_ID = ${data.idOrder}

        delete from WYDANIA_SZCZEGOLY
        WHERE WYDANIE_ID = ${data.idOrder}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const fetchTransfers = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT * FROM TRANSFERS
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const getClients = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        select *
        from KLIENCI
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const addClient = async ({client}) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        INSERT INTO KLIENCI (SYMBOL, NAZWA, NIP, KOD_POCZTOWY, MIEJSCOWOSC, ADRES, KRAJ, ADRES_EMAIL, TELEFON)
        VALUES ('${client.symbol}','${client.nazwa}','${client.nip}','${client.kod}','${client.miejscowosc}','${client.adres}','${client.kraj}','${client.email}', '${client.telefon}')
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const deleteClient = async ({idClient}) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        delete from KLIENCI
        where id = ${idClient}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const fetchUsers = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT
        ID,
        NAME,
        SURNAME,
        LOGIN,
        CASE WHEN ONE_TIME_PASSWORD = 1 THEN 'Tak' ELSE 'Nie' END ONE_TIME_PASSWORD,
        CASE WHEN USER_FOR = 1 THEN 'Aplikacja webowa' ELSE 'Aplikacja mobilna' END USER_FOR
        FROM USERS
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const addUser = async ({user}) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        insert into USERS (NAME, SURNAME, LOGIN, PASSWORD, ONE_TIME_PASSWORD, USER_FOR)
        values ('${user.imie}','${user.nazwisko}','${user.login}','${user.haslo}',1 ,'${user.do}')
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const deleteUser= async ({userId}) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        delete from USERS
        where id = ${userId}
        `)
    }
    catch (error) {
        console.log(error)
    };
};

const fetchHistoryReleases = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT  [ID_WYDANIE_HIST]
        ,[WYDANIE_ID]
        ,(select top 1 SYMBOL from KLIENCI k where k.id = KLIENT_ID) KLIENT
        ,[ILOSC]
        ,[WAGA]
        ,[ODBIORCA]
        ,[KOD_POCZTOWY]
        ,[MIEJSCOWOSC]
        ,[ADERES]
        ,[KRAJ]
        ,[DANE_AUTA]
        ,[OBSLUGA]
        ,[OBLUSG_START]
        ,[OBSLUGA_KONIEC]
        FROM [NEXT_GEN_SQL].[dbo].[WYDANIA_HIST]
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const fetchHistoryDetailsReleases = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        select *
        from WYDANIA_POZYCJE_HIST
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const fetchHistoryOrders = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        SELECT TOP (1000) [ID_PRZYJECIA_HIST]
        ,[PRZYJĘCIE_ID]
        ,[ILOSC]
        ,[WAGA]
        ,[NADAWCA]
        ,[KOD_POCZTOWY]
        ,[MIEJSCOWOSC]
        ,[ADRES]
        ,[KRAJ]
        ,[UWAGI]
        ,[DANE_AUTA]
        ,[OBSLUGA]
        ,[OBSLUGA_START]
        ,[OBSLUGA_KONIEC]
        ,[STAN]
        ,[NR_WLASNY]
        ,(SELECT TOP 1 K.SYMBOL FROM KLIENCI K WHERE K.ID = KLIENT_ID) KLIENT
        FROM [NEXT_GEN_SQL].[dbo].[PRZYJECIA_HIST]
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
};

const fetchHistoryDetailsOrders = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        select *
        from PRZYJECIA_SZCZEGOLY_HIST
        `)
        return data
    }
    catch (error) {
        console.log(error)
    };
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
    setNewCarriers,
    deleteCarrier,
    apiFetchStocks,
    apiFetchStocksDetails,
    apiFetchRelesesOrders,
    fetchNewRelesesDetails,
    setNewRelese,
    deleteRelese,
    clearWorkerFromRelese,
    setWorkerToRelese,
    fetchTransfers,
    getClients,
    addClient,
    deleteClient,
    fetchUsers,
    addUser,
    deleteUser,
    fetchHistoryReleases,
    fetchHistoryDetailsReleases,
    fetchHistoryOrders,
    fetchHistoryDetailsOrders
};