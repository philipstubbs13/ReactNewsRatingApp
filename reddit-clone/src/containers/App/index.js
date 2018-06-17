// import React
import React, { Component } from 'react';
// import Firebase 
import firebase from './firebase-config';


class App extends Component {
  constructor() {
    super();

    console.log(firebase.name);
    console.log(firebase.database());
  }

  state = {
    posts: [],
    loading: true
  };

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
  // We'll use firebase's set method to update our voting count. 
  render() {
    return (
      <div className="App">
        {this.props.children && React.cloneElement(this.props.children, {
          // https://github.com/ReactTraining/react-router/blob/v3/examples/passing-props-to-children/app.js#L56-L58
          firebase: firebase.database(),
          posts: this.state.posts,
          loading: this.state.loading 
        })}
      </div>
    );
  }
}

export default App;
