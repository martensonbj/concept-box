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
    signIn(creds)
    .then(res => this.setState({ user: res.uid }))
    .catch(err => this.setState({ user: null }))

  }

  render() {

    return (
      <div className="App">
        <AdminControls signIn={this.attemptSignIn.bind(this)}/>
        <Form handleClick={ (concept) => this.saveConcept(concept) } />
        <ConceptList concepts={ this.state.concepts } />
      </div>
    );
  }
}

export default App;
