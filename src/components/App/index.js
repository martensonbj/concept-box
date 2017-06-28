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
      user: null,
      error: false
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
        this.updateFirebase(objectToUpdate)
      })
    }
  }

  updateFirebase(updatedObject) {
    firebase.database().ref('concepts').set(JSON.stringify(updatedObject))
  }

  attemptSignIn(email, password) {
    signIn(email, password)
      .then(res => {
        const user = { email: res.email, id: res.uid }
        this.setState({ user })
      })
      .catch(err => this.signInError())
  }

  signInError() {
    this.setState({ user: null, error: true })
  }

  updateRatings(rating) {
    const newState = Object.assign({}, this.state.ratings, rating)
    this.setState({ ratings: newState })
  }

  updateCount() {
    const newCount = this.state.conceptsMarked + 1
    this.setState({ conceptsMarked: newCount })
  }

  submitRatings() {
    const { ratings, concepts } = this.state;
    const ratingKeys = Object.keys(ratings);
    const updatedConcepts = Object.assign({}, concepts)

    ratingKeys.forEach(key => {
      const newRating = ratings[key]
      updatedConcepts[key].push(newRating)
    })

    this.updateFirebase(updatedConcepts)
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
    const { user, concepts, formComplete, error } = this.state;

    const toggleForm = () => {
      if(user) {
        return <Form handleClick={ (concept) => this.saveConcept(concept) } user={ user }/>
      } else {
        return null
      }
    }

    const signInError = () => {
      if(error) {
        return <div className='signIn-error'>Password and/or email inccorect, please try again.</div>
      }
    }

    return (
      <div className="App">
        <AdminControls user={ user }
                       signIn={ this.attemptSignIn.bind(this) }
                       signOut={ () => this.setState({ user: null }) }
                       resetInput={ () => this.setState({ error: false }) }
                       error={ signInError() }/>

        { toggleForm() }

        <ConceptList concepts={ concepts }
                     updateRatings={ this.updateRatings.bind(this) }
                     submitRatings={ this.submitRatings.bind(this) }
                     formComplete={ this.formComplete() }
                     updateCount={ this.updateCount.bind(this) }/>
      </div>
    );
  }
}

export default App;
