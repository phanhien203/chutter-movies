import React from "react";

import './greeting.scss';

export default class Greeting extends React.Component {
  render() {
    return (
      <div className="greeting">
        <h1 className="welcome">Welcome.</h1>
        <p className="wel">Millions of movies, TV shows and people to discover. Explore now.</p>
      </div>
    );
  };
}