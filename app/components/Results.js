import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
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
            <PlayerResult
              info={playerOneInfo}
              isWinner={playerOneScore > playerTwoScore}
            />
            <PlayerResult
              info={playerTwoInfo}
              isWinner={playerOneScore < playerTwoScore}
            />
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
        <Loading />
      )
    }
  }
}

function PlayerResult (props) {
  const {
    isWinner,
    info: {
      avatar_url,
      followers,
      login,
      public_repos,
      score,
    },
  } = props;
  return (
    <div className="results-player">
      <h1>{ isWinner ? 'Winner' : 'Loser' }</h1>
      <h2>Score: { score }</h2>
      <img className="preview-image" src={avatar_url} width="200" />
      <h2 className="preview-username">@{login}</h2>
      <p>Followers: { followers }</p>
      <p>Public Repos: { public_repos }</p>
    </div>
  );
}

PlayerResult.propTypes = {
  info: PropTypes.object.isRequired,
  isWinner: PropTypes.bool,
  score: PropTypes.number,
}

PlayerResult.defaultProps = {
  isWinner: false,
  score: 0,
}
// TODO: define shape of info

export default Results;
