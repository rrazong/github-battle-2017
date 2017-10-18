import React from 'react';
import PropTypes from 'prop-types';

function Player (props) {
  const { children, imageUrl, score, title, username } = props;
  return (
    <div className="player">
      { title &&
        <h1>{ title }</h1>
      }
      { score >= 0 &&
        <h2>Score: { score }</h2>
      }
      <img className="player-image" src={imageUrl} width="200" />
      <h2>@{username}</h2>
      { children }
    </div>
  );
}

Player.propTypes = {
  children: PropTypes.node,
  imageUrl: PropTypes.string.isRequired,
  score: PropTypes.number,
  title: PropTypes.string,
  username: PropTypes.string.isRequired,
}

Player.defaultProps = {
  children: null,
  score: undefined,
  title: undefined,
}

export default Player;
