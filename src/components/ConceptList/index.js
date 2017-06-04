import React from 'react';
import './styles.css';
import Concept from '../Concept';

const ConceptList = ({ concepts }) => {

    const displayConcepts = () => {
      if(concepts) {
        return Object.keys(concepts).map((concept, i) => {
          return (
            <Concept concept={concept} key={i}/>
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
      </section>
    )
}

export default ConceptList;
