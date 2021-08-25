import firebase from 'firebase/app'
import "firebase/auth"

const fetch = require('node-fetch');
const fs = require('fs')

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

//const auth = app.auth()
const db = app.firestore()

function getDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return dd+'-'+mm+'-'+yyyy;
    
}

async function getPricingData() {
    console.log(new Date())
    let response = await fetch("https://api.scryfall.com/bulk-data")
    console.log(response)
    if(response.status === 200) {
        try {
            let bulkData = await response.json()
            if(bulkData) {
                    const res = await fetch(bulkData.data[2].download_uri);
                    let today = getDate()
    
                    const fileStream = fs.createWriteStream(`scryfall-${today}.json`);
                    await new Promise((resolve, reject) => {
                        res.body.pipe(fileStream);
                        res.body.on("error", reject);
                        fileStream.on("finish", resolve);
                    });
            }
        } catch (error) {
            console.log(error)
        }
       
    }

}

//getPricingData()

let today = getDate()
const data = require(`./scryfall-${today}`);
if(data) {
    const priceHistoryData = []
    for(var i = 0; i<data.length; i++) {
        const cardData = {}
        cardData.id = data[i].id
        cardData.prices = data[i].prices
        delete cardData.prices.tix
        priceHistoryData.push(cardData)
    }
    
  //  fs.writeFileSync('priceData1day.json', JSON.stringify(priceHistoryData))
    db.collection("priceHistory").doc(today).set(priceHistoryData)
}

console.log(new Date())
