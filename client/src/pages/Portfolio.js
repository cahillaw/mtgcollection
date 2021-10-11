import React, { useState, useEffect } from 'react'
import firebase from "../firebase"
import "firebase/firestore"

import { useAuth } from "../contexts/AuthContext"
import { getBulkCards } from '../functions/Scryfall'

import { Grid, makeStyles, Button, Card, CardContent, Typography, CardMedia } from '@material-ui/core'


import NavBar from "../components/NavBar"
import CollectionPriceHistory from "../components/CollectionPriceHistory"
import CardsTable from "../components/CardsTable"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 10,
        paddingRight: 10
    },
    topcontainer: {
        marginTop: 15
    },
    stats: {
      //  border: "1px solid gray",
       // borderRadius: 10
    },
    media: {
        height: 100,
        width: 137,
        borderRadius: 2
    },
    cardContent: {
        padding: 2,
        paddingBottom: "2px !important"
    }
}));

export default function Portfolio() {
    const { currentUser } = useAuth()
    let db = firebase.firestore()

    const classes = useStyles();
    const [collectionData, setCollectionData] = useState(null)



    useEffect(() => {
            //listen for new changes
            const cards = db.collection("users/" + currentUser.uid + "/cards").orderBy("transaction.transactionDate", "desc")
            cards.onSnapshot(async (qS) => {
                let items = []
                let scryfallIds = new Set()

                qS.forEach((doc) => {
                    let card = doc.data()
                    items.push(card)
                    scryfallIds.add(card.id)
                })

                console.log(items)

                let data = await getBulkCards([...scryfallIds])
                
                let scryfallMap = new Map()
                data.data.forEach((card) => {
                    if(!scryfallMap.has(card.id)) {
                        scryfallMap.set(card.id, card)
                    }
                })
    
    
                items.forEach((card) => {
                    card.printingInfo = scryfallMap.get(card.id)
                })
                console.log(items)
                setCollectionData(items)

            })   
    },[])

    return (
        <div>
            <NavBar></NavBar>
            <Grid container direction="column" className={classes.root}>
                <Grid item xs={12} id="profile" className={classes.topcontainer}>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} sm={8} className={classes.stats}>
                            <CollectionPriceHistory></CollectionPriceHistory>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.stats}>
                            <div className='header'>
                                <h3 className='title'>Collection Statistics</h3>
                            </div>
                            <div>Value: <strong>$882</strong></div>    
                            <div>Number of Cards: <strong>1144</strong></div>
                            <div>Amount Spent: <strong>$414</strong></div>
                            <div>Daily Price Change: <strong>+4.83</strong></div>
                            <div>Weekly Price Change: <strong>+12.89</strong></div>
                            <div>Monthly Price Change: <strong>-1.12</strong></div>
                            <div>Change Since Last Login: <strong>+4.25</strong></div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} id="profile">items
                    {collectionData && <Grid container direction = "row" spacing={1}>
                            {collectionData.map((cardData, key) => {
                                return (
                                    <Grid item key={key}>
                                        <Card>
                                            <CardContent className={classes.cardContent}>
                                                <CardMedia>
                                                    <img src={cardData.printingInfo.image_uris.art_crop} className={classes.media} alt="recipe thumbnail"/>
                                                </CardMedia>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            
                        })}
                        </Grid>}
                </Grid>
                <Grid>
                    {collectionData && <CardsTable collectionData={collectionData}></CardsTable>}
                </Grid>
                <br></br>
                <br></br>
            </Grid>
        </div>
    )
}