import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { Grid, makeStyles, Card, CardContent, Typography, Button, TextField, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import Transaction from "../components/Transaction"
import { getAutoCompleteResults, getCardByName } from "../functions/Scryfall"

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
    const [transactions, setTransactions] = useState(transactionData.transactions)
    const [newTransaction, setNewTransaction] = useState(false)
    const [autocompleteResults, setAutocompleteResults] = useState([])
    const [currentQuery, setCurrentQuery] = useState(null)
    const [selectedCardInfo, setSelectedCardInfo] = useState('')
    const [cardsAdded, setCardsAdded] = useState([])
    const [cardsRemoved, setCardsRemoved] = useState([])

    const [printing, setPrinting] = useState('')
    const [isFoil, setIsFoil] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

/*
    useEffect(() => {
        async function getCardInfo() {
            console.log(selectedCard)
            //if > 175 printings handle case lol
            let response = await getCardByName(selectedCard)
            console.log(response.data)
            setSelectedCardInfo(response.data)
        }

        getCardInfo()

    },[selectedCard])
*/
    return (
        <PageWrapper>
            {newTransaction && <Grid item xs={12} id="transactionstopcontainer" className={classes.topContainer}>
                <Typography variant="h5" component="h2">
                    New Transaction
                </Typography>
                <Card variant="outlined" className={classes.addCardsContainer}>
                    <CardContent>
                        <Grid container direction="row">
                            <Grid item xs={6}>
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
                                            console.log(currentQuery)
                                            //if > 175 printings handle case lol
                                            let response = await getCardByName(currentQuery)
                                            console.log(response.data)
                                            setSelectedCardInfo(response.data)
                                            setPrinting(response.data[0])
                                            setIsFoil(!response.data[0].nonfoil)
                                        }} 
                                        disabled={currentQuery === null}>Select</Button>
                                    </Grid>
                                </Grid>
                                {selectedCardInfo !== "" && printing !== '' && 
                                    <Grid>
                                        <Typography variant="h5" component="h2">
                                            {printing.name}
                                            {console.log(selectedCardInfo)}
                                        </Typography>
                                        <Grid container direction="row">
                                            {console.log(printing)}
                                            <img src={printing.image_uris.normal} className={classes.media} alt="selected card"></img>
                                            <TextField
                                                id="standard-set-select"
                                                select
                                                label="Set"
                                                className={classes.dropdowns}
                                                value={printing}
                                                onChange={(e)=>{
                                                    setPrinting(e.target.value)
                                                    setIsFoil(!e.target.value.nonfoil)
                                                    console.log(e.target.value)
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
                                            <FormControlLabel
                                                control={<Checkbox checked={isFoil} onChange={()=>setIsFoil(!isFoil)} name="foil" />}
                                                label="Foil?"
                                            />
                                        </Grid>
                                    </Grid>}
                            </Grid>
                            <Grid item xs={6}>
                                <AddIcon className={classes.addIcon}></AddIcon>
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
                {transactions.map((transaction) => {
                    return <Transaction data={transaction}></Transaction>
                })}
            </Grid>
        </PageWrapper>
    )
}
