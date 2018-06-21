import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 80,
    borderStyle: 'outset',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'dodgerblue',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'white',
  }
};

function Footer(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
           React News Rating App
           </Typography>
          <Typography className={classes.pos} color="textSecondary">
            &copy; Copyright 2018 Phil Stubbs
          </Typography>
        </CardContent>
        <CardActions>
            <Button 
            variant="outlined" 
            color="primary" 
            className={classes.button} 
            href="https://github.com/philipstubbs13/ReactNewsRatingApp"
            target="_blank"
            >
                GitHub Repo
            </Button>
            <Button 
            variant="outlined" 
            color="secondary" 
            className={classes.button}
            href = "https://www.linkedin.com/in/philipjstubbs/"
            target="_blank"
            >
                LinkedIn
            </Button>
        </CardActions>
      </Card>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);