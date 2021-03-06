// src/containers/Posts/index.js
// Here, we're just mapping over the data and rendering it to the user interface.

// import React
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './index.css';

const styles = theme => ({
  dislikeButton: {
    margin: 20,
  },
  button: {
    backgroundColor: '#576490'
  },
  counter: {
    fontSize: 18,
    marginTop: 10,
  },
  body: {
    fontSize: 18,
    marginTop: 10,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    borderStyle: 'solid',
    borderColor: '#576490',
    borderWidth: 2,
  }),
});

class Posts extends Component {

  // In these two methods, whenever a user clicks on either of the buttons, the respective count is incremented in the database and is instantly updated in the browser.
  handleUpvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      body: post.body,
      upvote: post.upvote + 1,
      downvote: post.downvote
    });
  }

  handleDownvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      body: post.body,
      upvote: post.upvote,
      downvote: post.downvote + 1
    });
  }

  render() {
    const { classes } = this.props;
    let posts = this.props.posts;
    let _this = this;

    if (!posts) {
      return false;
    }
    
    if (this.props.loading) {
      return (
        <div>
          Loading…
        </div>
      );
    }

    return (
        <div className="Posts main-content-section">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Link to="/add-post">
                <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                  <AddIcon />
                </Button>
              </Link>
              { Object.keys(posts).map(function(key) {
                  return (
                    <div key={key}>
                      <Paper className={classes.root} elevation={4}>
                        <Typography variant="headline" component="h3">
                        Title: { posts[key].title } 
                        </Typography>
                        <Typography component="p" className={classes.body}>
                        { posts[key].body } 
                        </Typography>
                        <Typography component="p" className={classes.counter}>
                            Likes: { posts[key].upvote }  
                        </Typography>
                        <Typography component="p" className={classes.counter}>
                          Dislikes: { posts[key].downvote } 
                        </Typography>
                        <div>
                          <Button
                            onClick={ _this.handleUpvote.bind(this, posts[key], key) }
                            type="button"
                            variant="contained" 
                            color="primary" 
                          >
                            <i className="far fa-thumbs-up"> </i> Like
                          </Button>
                          <Button
                            onClick={ _this.handleDownvote.bind(this, posts[key], key) }
                            type="button"
                            variant="contained" 
                            color="secondary" 
                            className={classes.dislikeButton}
                          >
                            <i class="far fa-thumbs-down"></i> Dislike
                          </Button>
                        </div>
                      </Paper>
                    </div>
                  );
              })}
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default withStyles(styles)(Posts);