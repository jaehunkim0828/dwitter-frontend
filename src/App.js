import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App({ socketClient }) {
  const [error, setError] = useState('');
  const [tweets, setTweet] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMzY1NjEzLCJleHAiOjE2NDE1Mzg0MTN9.F0RhB92hBIkHQg8tUp38LtwEO6ajmXnHzjXDMtYBwGg';

  async function getAllTweets() {
    const test = await axios.get('http://localhost:8080/twit', {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return test.data;
  }

  

  useEffect(() => {
    getAllTweets()
      .then(tweets => {
        setTweet([...tweets])
      })
      .catch(onError)
    const stopSocket = socketClient.onSync('dwitter', tweet => {
      console.log(tweet);
      setTweet([...tweets, tweet]);
    });
    return () => {
      stopSocket()
    }
  }, [])

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  return (
    <div>
      {tweets.map((tweet, i) => (
        <div key={i}>{tweet.text}</div>
      ))}
    </div>
  );
}

export default App;
