export const deleteUser = async (props) => {
    await fetch('/deleteUser', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            userId: props
        })
    })
};


export const addUser = async(data) => {
    await fetch('/addUser', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            user: data
        })
    })
};