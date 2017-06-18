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
      ratings: {},
      conceptsMarked: 0,
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

  updateRatings(rating) {
    const newState = Object.assign({}, this.state.ratings, rating)
    const newCount = this.state.conceptsMarked + 1
    this.setState({
      ratings: newState,
      conceptsMarked: newCount
    })
  }

  submitRatings() {
    const ratingKeys = Object.keys(this.state.ratings);
    ratingKeys.forEach(key => {
      const newRating = this.state.ratings[key]
      this.state.concepts[key].push(newRating)
    })
  }

  formComplete() {
    const { conceptsMarked, concepts } = this.state;
    const numOfConcepts = Object.keys(concepts).length

    if (conceptsMarked === numOfConcepts) {
      return false
    } else {
      return true
    }
  }

  render() {
    const { user, concepts, formComplete } = this.state;

    const toggleForm = () => {
      if(user) {
        return <Form handleClick={ (concept) => this.saveConcept(concept) } user={ user }/>
      } else {
        return null
      }
    }

    return (
      <div className="App">
        <AdminControls user={ user }
                       signIn={ this.attemptSignIn.bind(this) }
                       signOut={ () => this.setState({ user: null }) }
                       />
        { toggleForm() }
        <ConceptList concepts={ concepts }
                     updateRatings={ this.updateRatings.bind(this) }
                     submitRatings={ this.submitRatings.bind(this) }
                     formComplete={ this.formComplete() } />
      </div>
    );
  }
}

export default App;
