import React, { useState } from 'react';
import 'moment'
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { makeStyles, Button, useMediaQuery } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  timeControls: {
    marginBottom: -10,
    marginLeft: 30,
  },
  timeControlsSmall: {
    marginLeft: 15,
  },
  smallButton: {
    minWidth: "45px"
  }
}));

export default function CollectionPriceHistory() {
  const under450 = useMediaQuery('(max-width:450px)') 
  const classes = useStyles();
  const [minDisplay, setMinDisplay] = useState('2018-06-28')
  const [maxDisplay, setMaxDisplay] = useState('2021-06-30')

  const data = {
    // labels: ["2015-03-15T13:03:00Z", "2015-03-25T13:02:00Z", "2015-09-25T14:12:00Z"],
     datasets: [{
       label: 'Collection Value',
       data: [{
         x: '2017-04-22',
         y: 1
       }, {
         x: '2018-06-28',
         y: 3
       }, {
         x: '2019-06-30',
         y: 5
       }, {
         x: '2020-07-02',
         y: 7
       },
       {
         x: '2020-12-22',
         y: 12
       }, {
         x: '2021-06-28',
         y: 13
       }, {
         x: '2021-06-30',
         y: 14
       }, {
         x: '2021-12-02',
         y: 15
       }],
       backgroundColor: 'rgb(255, 99, 132)',
       borderColor: 'rgba(255, 99, 132, 0.7)',
     }]
   };
   
   const options = {
     scales: {
       x: {
         type: 'time',
         min: minDisplay,
         max: maxDisplay
       },
     },
     plugins: {
       legend: {
         display: false
       }
     }
   };



    return (
        <>
        <div className='header'>
          <h3 className='title'>Inventory History</h3>
        </div>
        <div className={under450 ? classes.timeControlsSmall : classes.timeControls}>
          <Button className={under450 ? classes.smallButton : null} onClick={()=>{setMinDisplay('2017-04-22')}}>1m</Button>
          <Button className={under450 ? classes.smallButton : null} onClick={()=>{setMinDisplay('2017-04-22')}}>3m</Button>
          <Button className={under450 ? classes.smallButton : null} onClick={()=>{setMinDisplay('2017-04-22')}}>6m</Button>
          <Button className={under450 ? classes.smallButton : null} onClick={()=>{setMinDisplay('2017-04-22')}}>ytd</Button>
          <Button className={under450 ? classes.smallButton : null} onClick={()=>{setMinDisplay('2017-04-22')}}>1y</Button>
          <Button className={under450 ? classes.smallButton : null} onClick={()=>{setMinDisplay('2021-12-02')}}>ALL</Button>
        </div>
          <Line data={data} options={options} />
        </>
    )
}

