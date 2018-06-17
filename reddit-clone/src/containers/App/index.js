// import React
import React, { Component } from 'react';
// import Firebase
import * as firebase from "firebase";
// import Firebase 
import config from './firebase-config';


class App extends Component {
  constructor() {
    super();

    // Initialize Firebase
    firebase.initializeApp(config);
  }

  componentWillMount() {

    //firebase.database() gives us a reference to the database service.
    // Using ref(), we can get a specific reference from the database.
    // if we we call ref('posts'), we'll be getting the posts reference from our database and storing that reference in postsRef.
    let postsRef = firebase.database().ref('posts');

    let _this = this;

    // postsRef.on('value', ...) gives us the updated value whenever there's any change in the database.
    // postsRef.once('value', ...) will only give us the data once.
    postsRef.on('value', function(snapshot) {
      console.log(snapshot.val());

      // After we get the updated value in our on() callback, we store the values in our posts stae.
      _this.setState({
        posts: snapshot.val(),
        loading: false
      });
    });
  }

  // Make the posts data available in all our children components, which will be passed through react-router.
  // We're checking if this.props.childrn exists or not, and if it exists we clone that element and pass all our props to all our children.
  // Calling cloneElement will shallowly merge the already existing props in this.props.children and the props we passed here (firebaseRef, posts, and loading).
  // firebaseRef, posts, and loading props will be available to all routes.
  render() {
    return (
      <div className="App">
        {this.props.children && React.cloneElement(this.props.children, {
          firebaseRef: firebase.database().ref('posts'),
          posts: this.state.posts,
          loading: this.state.loading 
        })}
      </div>
    );
  }
}

export default App;
