export  const sendNewOrder = async (newOrder, data) => {
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
    window.location.reload(false);
};

export const clearWorkerFromOrder = async ( id ) => {
    console.log(id)
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
        window.location.reload(false);
};

export const setWorkerToOrder = async ({ id, worker }) => {
    console.log(id + worker)
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
        window.location.reload(false);
    }
};