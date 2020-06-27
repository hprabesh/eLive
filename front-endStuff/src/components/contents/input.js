import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const priorities = [
  {
    value: 'high',
    label: 'High',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'low',
    label: 'Low',
  },
];
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),

        },
      },
  tool: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [priorityLevel, setPriorityLevel] = React.useState('medium!');
  const handleChange = (event) => {
    setPriorityLevel(event.target.value);
  };

  return (
    <React.Fragment>
      <Paper> 
      
        
        <form className={classes.root} noValidate autoComplete="off" method="POST" action="http://localhost:9001/addTask">
          <Paper className={classes.tool}>
            <InputBase
              className={classes.input}
              placeholder="Add Tasks"
              inputProps={{ 'aria-label': 'Please Add Your Tasks' }}
              name="newtask"
            />
            
          </Paper>
          <TextField id="dueDate" label="Due Task" variant="filled" type='date'  InputLabelProps={{
                shrink: true,
              }} name="dueDate"/>
          <TextField id="dueTime" label="Due Time" variant="filled" type='time' InputLabelProps={{
                shrink: true,
              }} name="dueTime"/>
          <TextField
              id="priorityLevel"
              select
              label="Select"
              value={priorityLevel}
              onChange={handleChange}
              helperText="Please select your priorities"
              name="priority"
            >
              {priorities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <ButtonGroup  color="inherit" aria-label="contained primary button group">
             <IconButton color="inherit" className={classes.iconButton} aria-label="Add to your To Do Lists" type="submit">
            <Icon style={{ fontSize: 30 }}>add_circle</Icon>
            <label style={{fontSize:15}}>Add Task</label>
            </IconButton>
            </ButtonGroup>
        </form>
      </Paper>
    </React.Fragment>
  );
}
// should work now