import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Toolbar, Button, Typography, AppBar } from "@material-ui/core"
import { Container, Navbar, Nav } from 'react-bootstrap'

import { useAuth } from "../contexts/AuthContext"

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#e24c4c",
    },
    toolbar: {
      maxWidth: 1000,
      marginLeft: "auto",
      marginRight: "auto",
      float: "none"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: "white",
      fontWeight: 500
    },
    text: {
        color: "white",
        marginTop: 5
    },
    navcontainer: {
      maxWidth: 1200
    }
  }));
  

export default function NavBar() {
    const classes = useStyles();
    const { currentUser } = useAuth()
    return (
      <Navbar expand="xl" className={classes.root} variant="light">
        <Container className={classes.navcontainer}>
          <Navbar.Brand className="extend" href = {currentUser ? "/home": "/"}>
          <span className={classes.title}>MTGCollection
                  </span>
          </Navbar.Brand>
          <Nav className="mr-auto">
              <Nav.Link href="/about">
                <span className={classes.text}>About
                  </span>
              </Nav.Link>
          </Nav>{
            currentUser ?
          <Nav.Link onClick={() => this.logOut()}><span className={classes.text}>Logout
          </span></Nav.Link> : 
          <Nav.Link href="/login"><span className={classes.text}>Login
          </span></Nav.Link>}
        </Container>
      </Navbar>

      /*
        <AppBar className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title}>
                MTGCollection
                </Typography>
                {currentUser ? 
                <Button color="inherit" className={classes.text}>Logout</Button> : 
                <Button color="inherit" className={classes.text}>Login</Button>}
            </Toolbar>
        </AppBar>
        */
    )
}
