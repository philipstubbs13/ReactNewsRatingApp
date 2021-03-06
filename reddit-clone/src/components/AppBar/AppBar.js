import React from 'react';
import { Link } from 'react-router';
import './AppBar.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    color: "white",
    marginLeft: 100,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function SwaggyAppBar(props) {
  const { classes } = props;
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <div className={classes.root} >
          <AppBar position="static" className="appBar" >
            <Toolbar>
              <Link to="/" className="link">
                <Typography variant="title" color="inherit" className={classes.flex}>
                  React News Rating App
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
      </Grid>
    </Grid>
  );
}

SwaggyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwaggyAppBar);
