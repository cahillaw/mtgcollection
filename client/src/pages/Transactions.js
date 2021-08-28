import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { Grid, makeStyles, Card, CardContent, Typography } from '@material-ui/core'
import Transaction from "../components/Transaction"

const transactionData = require("../transactiondatatest.json")

const useStyles = makeStyles((theme) => ({
   topContainer: {
       border: "1px solid black",
       marginTop: 15
   },
   pastTransactions: {
        //border: "1px solid black",
        marginTop: 15
   }
}));

export default function Transactions() {
    const classes = useStyles();
    const [transactions, setTransactions] = useState(transactionData.transactions)
    return (
        <PageWrapper>
            <Grid item xs={12} id="transactionstopcontainer" className={classes.topContainer}>
                swag
            </Grid>
            <Grid item xs={12} id="pasttransactions" className={classes.pastTransactions}>
                Past Transactions
                {console.log(transactions)}
                {transactions.map((transaction) => {
                    return <Transaction data={transaction}></Transaction>
                })}
            </Grid>
        </PageWrapper>
    )
}
