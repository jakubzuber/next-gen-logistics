export const deletePlace = async (props) => {
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
};

export const sendNewPlacesToDatabase = async(data) => {
    await fetch('/setNewPlaces', {
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