import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
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
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h1">
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
            onChange={ this.handleChange }
            value={ this.state.title }
          />
          <Button variant="contained" color="primary" className={classes.button} type="submit"
            onClick={ this.handleSubmit }>
            Submit
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AddPost);