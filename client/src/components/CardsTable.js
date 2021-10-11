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
  table: {
    minWidth: 650,
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

export default function CardsTable({
    collectionData 
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell>Card</TableCell>
            <TableCell align="right">Set</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">7-Day</TableCell>
            <TableCell align="right">Custom</TableCell>
            <TableCell align="right">Acq. Price</TableCell>
            <TableCell align="right">% Gain/Loss</TableCell>
            <TableCell align="right">Date Acq.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collectionData !== "" && collectionData.map((card, index) => (
            <TableRow key={index} className={index%2 === 1 ? classes.row : classes.oddRow}>
              <TableCell component="th" scope="row">
                <CardImagePopover name={card.printingInfo.name} imageSrc={card.printingInfo.image_uris.normal}></CardImagePopover>
              </TableCell>
              <TableCell align="right">{card.printingInfo.set}</TableCell>
              <TableCell align="right">{card.printingInfo.prices.usd}</TableCell>
              <TableCell align="right">+2.21%</TableCell>
              <TableCell align="right">+4.41%</TableCell>
              <TableCell align="right">{card.price}</TableCell>
              <TableCell align="right">+20%</TableCell>
              <TableCell align="right">{card.transaction.transactionDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
