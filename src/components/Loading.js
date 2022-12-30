import React from 'react';
import '../style/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <main className="main-loading">
        <div className="loading-anim" />
        <h1 className="loading-txt">&emsp;Carregando...</h1>
      </main>
    );
  }
}

export default Loading;
