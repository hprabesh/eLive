import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ListIcon from '@material-ui/icons/List';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#222222',
    color:'white',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icons:{
    color:"inherit",
  }
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      
      <ListItem button>
        <ListItemIcon className={classes.icons}>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="To Do List" />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.icons}>
          <MusicNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Songs/Videos" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon className={classes.icons}>
          <PhotoCameraIcon />
        </ListItemIcon>
        <ListItemText primary="Camera" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon className={classes.icons}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Snap" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon className={classes.icons}>
              <SendIcon/>
            </ListItemIcon>
            <ListItemText primary="Messenger" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
