export const deleteCarrier = async (props) => {
    console.log(props)
    await fetch('/deletePlace', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idPlace: props
        })
    })
    window.location.reload(false);
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