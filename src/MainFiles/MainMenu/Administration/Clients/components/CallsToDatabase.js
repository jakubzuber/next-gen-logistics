export const deleteClient = async (props) => {
    await fetch('/deleteClient', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idClient: props
        })
    })
};


export const addClient = async(data) => {
    await fetch('/addClient', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client: data
        })
    })
};