import React, { Component } from 'react';

class AddPost extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: ''
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
      upvote: 0,
      downvote: 0
    });

    // After the new post has been stored in the database, we make the input box empty again, ready to add a new post.
    this.setState({
      title: ''
    });
  }

  render() {
    return (
      <div className="AddPost">
        <input
          type="text"
          placeholder="Write the title of your post"
          onChange={ this.handleChange }
          value={ this.state.title }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AddPost;