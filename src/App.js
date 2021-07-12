import React, { useState } from 'react';
import { useCounter, formatTime } from './helpers/useCounter'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
  const [value, setValue] = useState(0)
  const {
    counter,
    isRunning,
    handleStart,
    handleReset,
    handlePause,
    handleMinus,
    handlePlus
  } = useCounter(value)
  const classes = useStyles();
  // console.log(value)
  // console.log(counter)

  return (
    <Grid container className={classes.root} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h1" >
                {formatTime(counter).getHours}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h1">
                {formatTime(counter).getMinutes}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h1">
                {formatTime(counter).getSeconds}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h1">
                {formatTime(counter).getMilliSeconds}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.item} item xs={12}>
        <Grid
          container
          alignItems='center'
          className={classes.container}
          spacing={3}>
          <Grid item>
            <TextField
              value={value === 0 ? '' : value}
              name='name'
              onChange={e => {
                setValue(e.target.value.replace(/\D/, '').slice(0, 2))
              }}
              pattern=""
              type='text'

              placeholder='Enter Number in ms form'
              className={classes.input}
              id="outlined-basic"
              variant="outlined" />
          </Grid>
          <Grid item>
            {
              !isRunning ?
                <Button
                  onClick={handleStart}
                  className={classes.margin}
                  variant="outlined">
                  start
                </Button>
                :
                <Button
                  onClick={handlePause}
                  className={classes.margin}
                  variant="outlined">
                  pause
                </Button>
            }
            <Button
              onClick={() => {
                handleReset()
                setValue(0)
              }}
              className={classes.margin}
              variant="outlined">
              reset
            </Button>
            <Button
              {...handlePlus}
              className={classes.margin}
              variant="outlined">
              plus
            </Button>
            <Button
              {...handleMinus}
              className={classes.margin}
              variant="outlined">
              minus
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    minHeight: '50vh',
    backgroundColor: '#20252a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    marginTop: theme.spacing(12),
    padding: theme.spacing(5),
    border: '#61dafb 2px solid',

    '& .MuiTextField-root': {
      width: '15ch',
      color: theme.palette.primary
    },
    '& .MuiOutlinedInput-root': {
      color: '#61dafb',
      border: '#61dafb 1px solid',
      fontSize: 13
    },
  },
  paper: {
    height: 220,
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  },
  container: {
    boxSizing: 'unset',
    flexWrap: 'inherit',
    border: '#61dafb 2px solid'
  },
  input: {
    borderRadius: 5,
  },
  margin: {
    marginLeft: theme.spacing(1),
    color: '#61dafb',
    border: '#61dafb 1px solid'
  },
}));

export default App