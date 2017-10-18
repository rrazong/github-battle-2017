import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Player from './Player';
import axios from 'axios';
import { battle } from '../utils/api';
import { parse } from 'query-string';

class Results extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    playerOneInfo: {},
    playerTwoInfo: {},
  }

  componentDidMount() {
    const { location } = this.props;
    const { playerOneName, playerTwoName } = parse(location.search);

    battle([ playerOneName, playerTwoName ])
      .then(([playerOneInfo, playerTwoInfo]) => {
      this.setState({
        playerOneInfo,
        playerTwoInfo,
      });
    });
  }

  render() {
    const { playerOneInfo, playerTwoInfo } = this.state;
    const { score: playerOneScore } = playerOneInfo;
    const { score: playerTwoScore } = playerTwoInfo;

    if (playerOneScore && playerTwoScore) {
      return (
        <div className="results">
          { playerOneScore == playerTwoScore &&
            <h1 className="results-tie">It's a tie!  No winner!</h1>
          }
          <div className="results-players">
            <Player
              imageUrl={playerOneInfo.avatar_url}
              score={playerOneInfo.score}
              title={playerOneScore > playerTwoScore ? 'Winner' : 'Loser'}
              username={playerOneInfo.login}
            >
              <p>Followers: {playerOneInfo.followers}</p>
              <p>Public Repos: {playerOneInfo.public_repos}</p>
            </Player>
            <Player
              imageUrl={playerTwoInfo.avatar_url}
              score={playerTwoInfo.score}
              title={playerOneScore < playerTwoScore ? 'Winner' : 'Loser'}
              username={playerTwoInfo.login}
            >
              <p>Followers: {playerTwoInfo.followers}</p>
              <p>Public Repos: {playerTwoInfo.public_repos}</p>
            </Player>
          </div>
          <div className="results-actions">
            <Link to="/battle">
              <button className="button-cta">
                Battle Again!
              </button>
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <Loading text="Getting results" />
      )
    }
  }
}

export default Results;
