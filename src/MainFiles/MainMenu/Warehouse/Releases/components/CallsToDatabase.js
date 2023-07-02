export  const newRelese = async ({newOrder, data}) => {
    await fetch('/setNewReleses', {
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

export const deleteRelese = async ( id ) => {
    await fetch('/deleteRelese', {
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

export const clearWorkerFromRelese = async ( id ) => {
        await fetch('/clearWorkerFromRelese', {
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

export const setWorkerToRelese = async ({ id, worker }) => {
    if (worker === null || worker === "") {
        return
    } else {
        await fetch('/setWorkerToRelese', {
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