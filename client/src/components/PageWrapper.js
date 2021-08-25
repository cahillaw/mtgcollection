import React from 'react'
import NavBar from "../components/NavBar"
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 10,
        paddingRight: 10
    },
}));


export default function PageWrapper(props) {
    const classes = useStyles();
    return (
        <div>
            <NavBar></NavBar>
            <Grid container direction="column" className={classes.root}>
                {props.children}  
            </Grid>   
        </div>
    )
}
