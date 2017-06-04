import React, { Component } from 'react';
import Form from '../Form';
import AdminControls from '../AdminControls';
import ConceptList from '../ConceptList'
import firebase, { signIn, signOut, provider } from '../../firebase';
import './styles.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      concepts: {},
      user: null
    }
  }

  componentDidMount() {
    this.pullConceptsFromFirebase()
  }

  pullConceptsFromFirebase() {
    firebase.database().ref('concepts').on('value', (snapshot) => {
      if(snapshot.val()) {
        this.setState({ concepts: JSON.parse(snapshot.val()) });
      }
    })
  }

  saveConcept(concept) {
    if(!this.state.concepts[concept]) {
      let newConcept = { [concept]: [] }
      let newState = Object.assign({}, this.state.concepts, newConcept)

      this.setState({ concepts: newState }, () => {
        let objectToUpdate = this.state.concepts
        firebase.database().ref('concepts').set(JSON.stringify(objectToUpdate))
      })
    }
  }

  attemptSignIn(creds) {
    signIn(creds.email, creds.password)
      .then(res => {
        const user = { email: res.email, id: res.uid }
        this.setState({ user })
      })
      .catch(err => this.setState({ user: null }))
  }

  signOutUser() {
    signOut
    this.setState({ user: null })
  }

  render() {
    const { user, concepts } = this.state;

    return (
      <div className="App">
        <AdminControls user={user}
                       signIn={this.attemptSignIn.bind(this)}
                       signOut={this.signOutUser.bind(this)}
                       />
        <Form handleClick={ (concept) => this.saveConcept(concept) } />
        <ConceptList concepts={ concepts } />
      </div>
    );
  }
}

export default App;
