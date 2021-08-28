import React, { useEffect } from 'react'
import { Grid, makeStyles, Card, CardContent, Typography } from '@material-ui/core'
import getBulkCards from "../functions/Scryfall"
import CardRow from "../components/CardRow"
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 8,
        marginBottom: 8
    },
    date: {
        float: 'right'
    }
 }));

export default function Transaction({
    data,
}) {
    const classes = useStyles();
    let idArray = []
    data.cardsAdded.forEach((card)=>{
        idArray.push(card.id)
    })
    
    return (
        <Card variant="outlined" className={classes.container}>
            <CardContent>
                <Typography color="textSecondary" className={classes.date}>
                    {data.datetime}
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.title}
                </Typography>
                <Typography color="textSecondary">
                    {data.type}
                </Typography>
                <Typography>
                    Added
                </Typography>
                <CardRow idArray={idArray}></CardRow>

            </CardContent>
        </Card>
    )
}
