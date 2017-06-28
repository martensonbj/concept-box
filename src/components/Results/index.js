import React, { Component} from 'react';
import firebase from '../../firebase';
import './styles.css';

export default class Results extends Component {
  constructor(props) {
    super(props)

  }

  render() {

    const showResults = () => {
      const { concepts } = this.props
      const conceptArray = Object.keys(concepts)

      return conceptArray.map(concept => {
        let avgScore;

        if (concepts[concept].length) {
          avgScore = concepts[concept].reduce((avg = 0, val) => (avg + val) / 2)
        } else {
          avgScore = 'No scores yet'
        }

        return (
          <div>
            <li>{ concept }: { avgScore }</li>
          </div>
        )
      })
    }

    return(
      <div>
        { showResults() }
      </div>
    )
  }
}
