import React from 'react';
import './styles.css';
import Concept from '../Concept';

const ConceptList = ({ concepts, updateRatings, submitRatings }) => {

    const displayConcepts = () => {
      if(concepts) {
        return Object.keys(concepts).map((concept, i) => {
          return (
            <Concept concept={concept} key={i} updateRatings={updateRatings} />
          )
        })
      } else {
        return <div>Add some concepts!</div>
      }
    }

    return (
      <section className="concept-list">
        <ul>
          { displayConcepts() }
        </ul>
        <button onClick={ submitRatings }>Submit Survey</button>
      </section>
    )
}

export default ConceptList;
