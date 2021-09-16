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

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15,
    paddingLeft: 10
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
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell></TableCell>
            <TableCell>Set No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Set</TableCell>
            <TableCell>Foil</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((card, index) => (
             <TableRow key={index} className={index%2 === 1 ? classes.row : classes.oddRow}>
              <TableCell>{card.added ? <AddIcon/> : <RemoveIcon/> }</TableCell>
              <TableCell component="th" scope="row">
                {card.printingInfo.collector_number}
              </TableCell>
              <TableCell>
                <CardImagePopover name={card.printingInfo.name} imageSrc={card.printingInfo.image_uris.normal} foil={card.foil}></CardImagePopover>
              </TableCell>
              <TableCell>{card.printingInfo.set}</TableCell>
              <TableCell>{card.foil ? "Foil" : "Nonfoil"}</TableCell>
              <TableCell align="right">{card.quantity}</TableCell>
              <TableCell align="right">{card.price}</TableCell>
              <TableCell align="right"><DeleteOutlineIcon/></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
