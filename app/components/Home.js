import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>
          Github Battle 2017
        </h1>
        <h2>
          Battle your friends and stuff
        </h2>
        <Link to="/battle">
          <button className="button-cta">
            Battle
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
