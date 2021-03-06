import React, { useEffect, useState } from 'react'
import firebase, { auth } from "../firebase"
import "firebase/firestore"

import { addTransaction, updateCollection } from '../functions/DbFunctions'
import { getAutoCompleteResults, getCardByName } from "../functions/Scryfall"

import PageWrapper from '../components/PageWrapper'
import { Grid, makeStyles, Card, CardContent, Typography, Button, TextField, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import Transaction from "../components/Transaction"
import foilOverlay from "../images/foilOverlay.png"
import TransactionTable from '../components/TransactionTable';

const transactionData = require("../transactiondatatest.json")

const useStyles = makeStyles((theme) => ({
   topContainer: {
     //  border: "1px solid black",
       marginTop: 15
   },
   titleBar: {
        marginBottom: -40,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 15
   },
   autocomplete: {
        display: "inline-block",
        width: "75%"
   },
   addSelect: {
        display: "inline-block",
   },
   dropdowns: {
        marginLeft: 5,
        marginRight: 5
   },
   media: {
        width: 205,
        borderRadius: 10,
   },
   foilOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        mixBlendMode: "multiply"
    },  
    foilwrapper: {
            position: "relative!important",
            width: 205
    },
    pastTransactionsText: {
        margin: 0
    },
    pastTransactions: {
            //border: "1px solid black",
        //  marginTop: 15
    },
    addCardsContainer: {

    },
    addButton: {
        float: "right"
    }
}));

export default function Transactions() {
    const classes = useStyles();

    const [transactions, setTransactions] = useState(null)
    const [newTransaction, setNewTransaction] = useState(false)
    const [autocompleteResults, setAutocompleteResults] = useState([])
    const [currentQuery, setCurrentQuery] = useState(null)
    const [selectedCardInfo, setSelectedCardInfo] = useState('')

    const [added, setAdded] = useState(true)
    const [printing, setPrinting] = useState('')
    const [foil, setFoil] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)

    const [cards, setCards] = useState([])

    let db = firebase.firestore()

    useEffect(() => {
        //listen for new changes
        const dbTrans = db.collection("users/" + auth.W + "/transactions").orderBy("datetime", "desc")
        dbTrans.onSnapshot((qS) => {
            let items = []
            qS.forEach((doc) => {
                items.push(doc.data())
            })
            items.sort((a,b)=>b.datetime - a.datetime)
            console.log(items)
            setTransactions(items)
        })
    },[])

    //if the printing updates, update the foil and price info
    useEffect(() => {
        if(printing !== "") {
            console.log(printing)
            setFoil(!printing.nonfoil)
            if(!printing.nonfoil) {
                setPrice(printing.prices.usd_foil)
            } else {
                setPrice(printing.prices.usd)
            }
        }
    },[printing])

    useEffect(() => {
        if(printing !== "") {
            if(foil) {
                setPrice(printing.prices.usd_foil)
            } else {
                setPrice(printing.prices.usd)
            }   
        }
    },[foil])

    return (
        <PageWrapper>
            {newTransaction && <Grid item xs={12} id="transactionstopcontainer" className={classes.topContainer}>
                <Typography variant="h5" component="h2">
                    New Transaction
                </Typography>
                <Card variant="outlined" className={classes.addCardsContainer}>
                    <CardContent>
                        <Grid container direction="row">
                            <Grid item xs={5}>
                                <Grid container direction="row">
                                    <Grid item xs={8}>
                                        <Autocomplete
                                            className={classes.autocomplete}
                                            id="free-solo-demo"
                                            freeSolo
                                            options={autocompleteResults.map((result) => result)}
                                            onChange = {(event, value)=>{setCurrentQuery(value)}}
                                            renderInput={(params) => (
                                            <TextField 
                                                {...params}  
                                                label="Card to Add" 
                                                margin="normal" 
                                                variant="outlined" 
                                                onChange={async (event, value) => {
                                                    let results = await getAutoCompleteResults(event.target.value)
                                                    setAutocompleteResults(results.data)
                                                }}/>
                                            )}
                                        />
                                        <Button className={classes.addSelect} onClick={async (e) => {
                                            e.preventDefault()
                                            //if > 175 printings handle case lol
                                            let response = await getCardByName(currentQuery)
                                            console.log(response.data)
                                            setSelectedCardInfo(response.data)
                                            setPrinting(response.data[0])
                                        }} 
                                        disabled={currentQuery === null}>Select</Button>
                                    </Grid>
                                </Grid>
                                {selectedCardInfo !== "" && printing !== '' && 
                                    <Grid>
                                        <Typography variant="h5" component="h2">
                                            {printing.name}
                                        </Typography>
                                        <Grid container direction="row">
                                            <Grid lg={6} md={6} xs={12}>
                                            <div className={classes.foilwrapper}>
                                                {foil && <img src={foilOverlay} className={classes.foilOverlay} alt="foiloverlay"></img>}
                                                <img src={printing.image_uris.normal} className={classes.media} alt="selected card"></img>
                                            </div>
                                            </Grid>
                                            <Grid lg={6} md={6} xs={12}>
                                                <Grid container direction="column">
                                                <TextField
                                                    id="standard-set-select"
                                                    select
                                                    label="Set"
                                                    className={classes.dropdowns}
                                                    value={printing}
                                                    onChange={(e)=>{
                                                        setPrinting(e.target.value)
                                                    }}
                                                    helperText="Select the printing"
                                                    >
                                                    {selectedCardInfo.map((card) => {
                                                        return <MenuItem key={card.id} value={card}>
                                                        {card.set + " - " + card.collector_number}
                                                        </MenuItem>
                                                    })}
                                                </TextField>
                                                <TextField
                                                    id="set-quantity"
                                                    label="Quantity"
                                                    className={classes.dropdowns}
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e)=>{
                                                        setQuantity(e.target.value)
                                                    }}
                                                    helperText="Select the quantity"
                                                    >                                
                                                </TextField>
                                                <TextField
                                                    id="set-price"
                                                    label="Price"
                                                    className={classes.dropdowns}
                                                    type="number"
                                                    value={price}
                                                    onChange={(e)=>{
                                                        setPrice(e.target.value)
                                                    }}
                                                    helperText="Select the price"
                                                    >                                
                                                </TextField>
                                                <FormControlLabel
                                                    control={<Checkbox checked={foil} onChange={()=>{    
                                                        setFoil(!foil)
                                                    }} 
                                                    name="foil" />}
                                                    label="Foil?"
                                                />
                                                <Button onClick={() => {
                                                    let entry = {
                                                        added: added,    
                                                        printingInfo: printing,
                                                        quantity: quantity,
                                                        price: price,
                                                        foil: foil
                                                    }       
                                                    setCards([...cards, entry])
                                                }}>Add Card</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>}
                            </Grid>
                            <Grid item xs={7}>
                                {cards.length > 0 && <div>
                                    <Typography variant="h5" component="h2">Cards Changed</Typography>
                                    <TransactionTable data={cards}></TransactionTable>
                                    <Button onClick={()=>{
                                        let cardsAdded = []
                                        cards.forEach((card)=>{
                                            let newFormat = {
                                                id: card.printingInfo.id,
                                                foil: card.foil,
                                                price: card.price,
                                                quantity: card.quantity
                                            }
                                            cardsAdded.push(newFormat)
                                        })

                                        let date = new Date()
                                        let data = {
                                            cardsAdded: cardsAdded,
                                            title: "Test Transaction",
                                            type: "Buy",
                                            datetime: Math.floor(date.getTime()/1000)
                                        }
                                        addTransaction(db, data, auth.W, updateCollection)
                                    }}>Create Transaction</Button>
                                </div>}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>}
            <Grid xs={12} className={classes.titleBar}>
                <Button className={classes.addButton} onClick={()=> setNewTransaction(!newTransaction)}>Add transaction</Button>
                <Typography variant="h5" component="h2" className={classes.pastTransactionsText}>
                    Past Transactions
                </Typography>
            </Grid>
            <Grid item xs={12} id="pasttransactions" className={classes.pastTransactions}>
                {transactions !== null && transactions.map((transaction) => {
                    return <Transaction data={transaction}></Transaction>
                })}
            </Grid>
        </PageWrapper>
    )
}
