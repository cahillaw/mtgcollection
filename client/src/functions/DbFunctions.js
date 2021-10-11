export const addTransaction = async(db, data, userid, updateCollection) => {
    console.log("in")
    try {
        const res = await db.collection('users/' + userid + '/transactions').add(data);
      
        console.log("Document written with ID: ", res.id);

        let result = await updateCollection(db, data, userid, res.id)
        console.log(result)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const updateCollection = async(db, data, userid, transactionId) => { 
  //max 500 in a batch
  let transaction = {
    transactionId: transactionId,
    transactionTitle: data.title,
    transactionDate: data.datetime
  }

  var batch = db.batch()
  for(let card of data.cardsAdded) {
    card.transaction = transaction

    let quantity = card.quantity
    delete card.quantity

    if(quantity && quantity > 0) {
      for(let i = 0; i<quantity; i++) {
        try {
          var res = await db.collection('users/' + userid + '/cards').doc(); //automatically generate unique id
          batch.set(res, card)
          console.log("Document written with ID: ", res.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }

  const result = await batch.commit()

  console.log(result)

  return result
}