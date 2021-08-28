export const getBulkCards = async (idArray) => {
    let url = "https://api.scryfall.com/cards/collection"
    let data = {
        identifiers: []
    }
    idArray.forEach(element => {
        data.identifiers.push({"id": element})
    });
    console.log(data)
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        try {
            let data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}