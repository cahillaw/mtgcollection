import React, { useState } from 'react'
import { Grid, makeStyles, Button, Card, CardContent, Typography, CardMedia } from '@material-ui/core'

import { useAuth } from "../contexts/AuthContext"

import NavBar from "../components/NavBar"
import CollectionPriceHistory from "../components/CollectionPriceHistory"

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
    const classes = useStyles();
    const [collectionData, setCollectioData] = useState("")

    let testBody = {"identifiers": [{"set":"THB", "name":"Mantle of the wolf"},{"set":"UGL", "name":"Miss Demeanor"},{"set":"M19", "name":"Respeldent Angel"},{"set":"SOI", "name":"Angel of Deliverance"},{"set":"BBD", "name":"Apocalypse Hydra"},{"set":"BFZ", "name":"Barrage Tyrant"},{"set":"RIX", "name":"Form of the Dinosaur"},{"set":"M20", "name":"Riddlemaster Sphinx"},{"set":"EMN", "name":"Mausoleum Wanderer"},{"set":"ORI", "name":"Harbinger of the Tides"}]}


    const getScryfallData = async (body) => {
        console.log(body)
        let url = "https://api.scryfall.com/cards/collection"
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            try {
                let data = await response.json()
                console.log(data)
                setCollectioData(data)
            } catch (error) {
                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
    }
    

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
                    <Button onClick={()=>{getScryfallData(testBody)}}>Click me!@</Button>
                    {collectionData !== "" ? 
                        <Grid container direction = "row" spacing={1}>
                            {collectionData.data.map((cardData, key) => {
                                return (
                                    <Grid item key={key}>
                                        <Card>
                                            <CardContent className={classes.cardContent}>
                                                <CardMedia>
                                                    <img src={cardData.image_uris.art_crop} className={classes.media} alt="recipe thumbnail"/>
                                                </CardMedia>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            
                        })}
                        </Grid> : null}
                </Grid>
            </Grid>
        </div>
    )
}