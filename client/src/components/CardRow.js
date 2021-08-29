import { Grid, makeStyles, Card, Chip, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { getBulkCards } from "../functions/Scryfall"

const useStyles = makeStyles((theme) => ({
    row: {
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "100%",
    },
    title: {
        float: "left"
    },
    total: {
        float: "right"
    },
    bgtext: {
        background: "#494949",
        color: "white"
    },
    more: {
        marginLeft: 5,
        marginRight: 5,
        display: "inline-block",
        width: 205,
        textAlign: "center",
    },
    media: {
        width: 205,
        borderRadius: 10,
    },
    item: {
        margin: 11,
        display: "inline-block"
    },
    quantity: {
        fontWeight: "bold",
        fontSize: 20,
        float: "right",
        whiteSpace: "normal"
    },
    price: {
        float: "left",
        fontWeight: "bold",
        fontSize: 20
    },
    infobar: {
        paddingLeft: 10,
        paddingRight: 10
    }
}));

export default function CardRow({
    data,
    type
}) {
    const classes = useStyles();
    const [cardData, setCardData] = useState('')
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {
        async function fetchData() {
            let idArray = []
            let total = 0
            data.forEach((card)=>{
                idArray.push(card.id)
                total = total + card.price*card.quantity
            })
            let res = await getBulkCards(idArray)
            const a3 = res.data.map(t1 => ({...t1, ...data.find(t2 => t2.id === t1.id)}))
            setCardData(a3)
            setTotalValue(total)
        }
        fetchData()
    }, [])

    return (
        <Grid>
            <Grid>
                <Typography variant="h6" className={classes.title}>
                    {type ? "Added" : "Removed"}
                </Typography>
                <Typography variant="h6" className={classes.total}>
                    Total Value: ${totalValue}
                </Typography>
            </Grid>
            <Grid className={classes.row}>
                {cardData !== '' && cardData.map((card) => {
                    return <Grid item className={classes.item}>
                        <Grid container direction="column">
                            <div className={classes.foilwrapper}><img src={card.image_uris.normal} className={classes.media} alt="recipe thumbnail"/></div>
                            <div className={classes.infobar}>
                                <span className={classes.quantity}>x{card.quantity}</span>
                                <span className={classes.price}>${card.price}</span>
                            </div>
                        </Grid>
                    </Grid>
                })}
                {cardData.length >= 7 && <Typography variant="h5" className={classes.more}>+ {cardData.length - 7} more</Typography>}
            </Grid>
        </Grid>
    )
}
  