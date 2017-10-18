import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Player from './Player'
import { stringify } from 'query-string';

export default class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImageUrl: '',
    playerTwoImageUrl: '',
  }

  handleReset = (id) => {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'ImageUrl']: '',
    }));
  }

  handleSubmit = (id, username) => {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'ImageUrl']: `https://github.com/${username}.png?size=200`,
    }))
  }

  render() {
    const {
      playerOneName,
      playerTwoName,
      playerOneImageUrl,
      playerTwoImageUrl,
    } = this.state;
    const { match } = this.props;

    return (
      <div className="battle">
        <div className="battle-players">
          { !playerOneName &&
            <PlayerForm
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          }
          { playerOneName &&
            <Player
              imageUrl={playerOneImageUrl}
              username={playerOneName}
            >
              <a
                className="player-reset"
                onClick={this.handleReset.bind(null, 'playerOne')}
              >
                Reset
              </a>
            </Player>
          }
          { !playerTwoName &&
            <PlayerForm
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          }
          { playerTwoName &&
            <Player
              imageUrl={playerTwoImageUrl}
              username={playerTwoName}
            >
              <a
                className="player-reset"
                onClick={this.handleReset.bind(null, 'playerTwo')}
              >
                Reset
              </a>
            </Player>
          }
        </div>

        { playerOneName && playerTwoName &&
          <div className="battle-actions">
            <Link to={{
              pathname: match.path + '/results',
              search: stringify({
                playerOneName,
                playerTwoName,
              }),
            }}>
              <button className="button-cta">
                Battle
              </button>
            </Link>
          </div>
        }
      </div>
    );
  }
}

class PlayerForm extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    username: '',
  }

  handleChange = (event) => {
    const { value: username } = event.target;
    this.setState(() => ({
      username
    }));
  }

  handleClick = () => {
    const { id, onSubmit } = this.props;
    const { username } = this.state;

    onSubmit(
      id,
      username,
    )
  }

  render() {
    const { label } = this.props;
    const { username } = this.state;

    return (
      <div className="player-form">
        <label htmlFor="player-username-form">
          {label}
        </label>
        <input
          className="player-username-form"
          type="text"
          onChange={this.handleChange}
          placeholder="Enter Github username"
          value={username}
        ></input>
        <button
          className="button-cta"
          disabled={!username}
          onClick={this.handleClick}
        >
          Submit
        </button>
      </div>
    )
  }
}
