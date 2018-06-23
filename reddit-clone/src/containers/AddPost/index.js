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
  },
  formError: {
    color: 'red',
  },
  postSuccess: {
    color: 'green',
    marginTop: 10,
    fontSize: 20
  }
});

class AddPost extends Component {
  constructor() {
    super();

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: '',
    body: '',
    titleError: '',
    postError: '',
    postSuccessMessage: ''
  };

  // The handleChange method updates our state with the value present in the input box. 
  // Now, when we click the button, the handleSubmit method is triggered.
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
      titleError: '',
      postSuccessMessage: ''
    });
  }

   handleBodyChange = (e) => {
    this.setState({
      body: e.target.value,
      postError: '',
      postSuccessMessage: ''
    });
  }

  // The handleSubmit method is responsible for making the API request to write to our database. We do it using the firebaseRef prop that we passed to all the children.
  handleSubmit = (e) => {
    e.preventDefault();

    // If title field is empty when user clicks Add post, return error.
    if (this.state.title === "") {
      this.setState({
        titleError: "Title is required."
      })
    }

    // If post field is empty when user clicks Add post, return error.
    if (this.state.body === "") {
      this.setState({
        postError: "Post is required."
      })
    }

    else {
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
        body: '',
        titleError: '',
        postError: '',
        postSuccessMessage: 'Post created successfully!'
      });
    }
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
                onChange={ this.handleTitleChange }
                value={ this.state.title }
              />
              <Typography component="p" className={classes.formError}>{this.state.titleError}</Typography>
              <TextField
                id="full-width"
                label="Post"
                multiline
                rowsMax = "4"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Write your post here"
                fullWidth
                margin="normal"
                className={classes.textField}
                onChange={ this.handleBodyChange }
                value={ this.state.body }
              />
              <Typography component="p" className={classes.formError}>{this.state.postError}</Typography>
              <Button variant="contained" color="primary" className={classes.button} onClick={ this.handleSubmit }
              >
                Add post
              </Button>
              <Typography component="p" className={classes.postSuccess}>{this.state.postSuccessMessage}</Typography>
            </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddPost);