import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import foilOverlay from "../images/foilOverlay.png"

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  media: {
      width: 205
  },
  foilOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    mixBlendMode: "multiply"
  },  
  foilwrapper: {
    position: "relative!important",
    width: 205
  },
}));

export default function CardImagePopover({
    name,
    imageSrc,
    foil
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <span
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="body1"
      >
        {name}
      </span>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
         <div className={classes.foilwrapper}>
            {foil && <img src={foilOverlay} className={classes.foilOverlay} alt="foiloverlay"></img>}
            <img src={imageSrc} className={classes.media} alt="selected card"></img>
        </div>
      </Popover>
    </div>
  );
}
