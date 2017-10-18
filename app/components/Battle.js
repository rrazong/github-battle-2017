import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
            <Player
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          }
          { playerOneName &&
            <PlayerPreview
              id="playerOne"
              imageUrl={playerOneImageUrl}
              username={playerOneName}
              onReset={this.handleReset}
            />
          }
          { !playerTwoName &&
            <Player
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          }
          { playerTwoName &&
            <PlayerPreview
              id="playerTwo"
              imageUrl={playerTwoImageUrl}
              username={playerTwoName}
              onReset={this.handleReset}
            />
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

class Player extends React.Component {
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

function PlayerPreview(props) {
  const { onReset, id, imageUrl, username } = props;
  return (
    <div className="preview">
      <h1 className="preview-username">@{username}</h1>
      <img className="preview-image" src={imageUrl} width="200" />
      <a
        className="preview-reset"
        onClick={onReset.bind(null, id)}
      >
        Reset
      </a>
    </div>
  );
}

PlayerPreview.propTypes = {
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}
