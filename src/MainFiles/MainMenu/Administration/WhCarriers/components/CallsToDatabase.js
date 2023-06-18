export const deleteCarrier = async (props) => {
    await fetch('/deleteCarrier', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idCarrier: props
        })
    })
};


export const postNewCarriers = async(data) => {
    await fetch('/postNewCarrier', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            data: data
        })
    })
};