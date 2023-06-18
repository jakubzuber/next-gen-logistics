export  const sendNewOrder = async ({newOrder, data}) => {
    await fetch('/setNewOrder', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            newOrder,
            data
        })
    })
};

export const deleteOrder = async ( id ) => {
    await fetch('/deleteOrder', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idOrder: id
        })
    })
};

export const clearWorkerFromOrder = async ( id ) => {
        await fetch('/clearWorkerFromOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                idOrder: id
            })
        })
};

export const setWorkerToOrder = async ({ id, worker }) => {
    if (worker === null || worker === "") {
        return
    } else {
        await fetch('/setWorkerToOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                idOrder: id,
                idWorker: worker
            })
        })
    }
};