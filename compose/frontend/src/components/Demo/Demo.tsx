import axios from 'axios';
import React from 'react';

import * as styles from './styles.css';

interface IThought {
  content: string;
}

interface IDemoState {
  error: string;
  thoughts: IThought[];
}

class Demo extends React.Component<{}, IDemoState> {
  state = {
    error: '',
    thoughts: [],
  };

  fetchThoughts = async () => {
    try {
      const { data } = await axios.get('/api');
      this.setState({ thoughts: data });
    } catch (err) {
      this.setState({
        error: `fetchThoughts Error: ${err.message}\n${err.stack}`,
      });
    }
  };

  seedThoughts = async () => {
    try {
      await axios.post('/api');
    } catch (err) {
      this.setState({
        error: `seedDatabase Error: ${err.message}\n${err.stack}`,
      });
    }
  };

  deleteThoughts = async () => {
    try {
      const { data } = await axios.delete('/api');
      this.setState({ thoughts: data });
    } catch (err) {
      this.setState({
        error: `deleteThoughts Error: ${err.message}\n${err.stack}`,
      });
    }
  };

  render() {
    const { error, thoughts } = this.state;

    const thoughtDisplay = thoughts.length ? (
      thoughts.map((t: IThought, i: number) => (
        <p className={styles.thought} key={i}>
          {t.content}
        </p>
      ))
    ) : (
      <p>No thoughts available; please seed the database.</p>
    );

    const errorDisplay = error.length ? (
      <p className={styles.error}>{error}</p>
    ) : null;

    return (
      <div className={styles.text}>
        <p>This app lets you read the thoughts of random people in LA.</p>
        <p>Click "Seed Thoughts" to gather the thoughts.</p>
        <p>Click "GET Thoughts" to view the thoughts.</p>
        <p>Click "DELETE Thoughts" to erase the thoughts.</p>
        <button onClick={this.seedThoughts}>Seed Thoughts</button>
        <button onClick={this.fetchThoughts}>GET Thoughts</button>
        <button onClick={this.deleteThoughts}>DELETE Thoughts</button>
        <hr />
        <h2>Thoughts:</h2>
        {thoughtDisplay}
        {errorDisplay}
      </div>
    );
  }
}

export default Demo;
