import { Grid, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { getBulkCards } from "../functions/Scryfall"

const useStyles = makeStyles((theme) => ({
    media: {
        width: 220,
        borderRadius: 10,
    },
    item: {
        marginLeft: 5,
        marginRight: 5
    }
}));

export default function CardRow({
    idArray
}) {
    const classes = useStyles();
    const [cardData, setCardData] = useState('')

    useEffect(() => {
        async function fetchData() {
            let data = await getBulkCards(idArray)
            setCardData(data)
        }
        fetchData()
    }, [])

    return (
        <Grid>
            <Grid container direction = "row">
                {cardData !== '' && cardData.data.map((card) => {
                    return <Grid item className={classes.item}>
                        <img src={card.image_uris.normal} className={classes.media} alt="recipe thumbnail"/>
                    </Grid>
                })}
            </Grid>
        </Grid>
    )
}
  