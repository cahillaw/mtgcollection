import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CardImagePopover from '../components/CardImagePopover'

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15
  },
  table: {
    //minWidth: 650,
  },
  row: {
      height: 35
  },
  oddRow: {
      backgroundColor: "#e8e8e8"
  },
  cardName: {

  }
});

export default function TransactionTable({
    data
}) {
  const classes = useStyles();
  console.log(data)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Set No.</TableCell>
            <TableCell>Set</TableCell>
            <TableCell>Foil</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((card, index) => (
            <TableRow key={index} className={index%2 === 1 ? classes.row : classes.oddRow}>
              <TableCell>sa</TableCell>
              <TableCell component="th" scope="row">
                  s
              </TableCell>
              <TableCell>z</TableCell>
              <TableCell>d</TableCell>
              <TableCell>{card.foil}</TableCell>
              <TableCell align="right">{card.quantity}</TableCell>
              <TableCell align="right">{card.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
