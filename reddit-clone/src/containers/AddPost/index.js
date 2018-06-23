import React, { Component } from 'react';
import { Link } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './AddPost.css';

const styles = theme => ({
  button: {
    marginTop: 50,
    backgroundColor: '#576490',
  },
  input: {
    display: 'none',
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 50,
    borderStyle: 'outset',
    borderColor: 'black',
    borderWidth: 2,
  }),
  textField: {
    marginTop: 50,
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  }
});

class AddPost extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: '',
    body: ''
  };

  // The handleChange method updates our state with the value present in the input box. 
  // Now, when we click the button, the handleSubmit method is triggered.
  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  // The handleSubmit method is responsible for making the API request to write to our database. We do it using the firebaseRef prop that we passed to all the children.
  handleSubmit = (e) => {
    e.preventDefault();

    // Sets the current value of the title to our database.
    this.props.firebase.ref('posts').push({
      title: this.state.title,
      body: this.state.body,
      upvote: 0,
      downvote: 0
    });

    // After the new post has been stored in the database, we make the input box empty again, ready to add a new post.
    this.setState({
      title: '',
      body: ''
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="AddPost main-content-section">
        <Grid container>
          <Grid item xs={12}>
            <Grid
            container
            spacing={16}
            justify='center'
          >
            <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h1" className={classes.header}>
                Add a post
              </Typography>
              <TextField
                id="full-width"
                label="Title"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Write the title of your post"
                fullWidth
                margin="normal"
                className={classes.textField}
                onChange={ this.handleChange }
                value={ this.state.title }
              />
              <TextField
                id="full-width"
                label="Body"
                multiline
                rowsMax = "4"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Write your post here"
                fullWidth
                margin="normal"
                className={classes.textField}
                onChange={ this.handleChange }
                value={ this.state.body }
              />
              <Link to="/" className="link">
                <Button variant="contained" color="primary" className={classes.button} type="submit"
                  onClick={ this.handleSubmit }>
                  Submit post
                </Button>
              </Link>
            </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddPost);