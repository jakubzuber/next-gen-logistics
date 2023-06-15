export const deletePlace = async (id) => {
    await fetch('/deletePlace', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idPlace: id
        })
    })
    closeContexMenu();
    window.location.reload(false);
};