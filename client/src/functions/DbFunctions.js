export const addTransaction = async(db, data, userid) => {
    console.log("in")
    try {
        const res = await db.collection('users/' + userid + '/transactions').add(data);
      
        console.log("Document written with ID: ", res.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const getTransactions = async (db, userid) => {
    const dbTrans = await db.collection("users/" + userid + "/transactions")
    console.log(dbTrans)
    let items = []

    dbTrans.onSnapshot((qS) => {
        qS.forEach((doc) => {
            items.push(doc.data())
        })
        console.log(items)
    })


    console.log(items)
    return items
}