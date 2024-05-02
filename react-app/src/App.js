import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [paragraph, setParagraph] = useState('');
  const [count, setCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!paragraph.trim()) {
      setError("Please enter some text to count.");
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:6002/api/countletters', { paragraph });
      setCount(`The paragraph has ${response.data.value} letters.`);
    } catch (error) {
      setError("Failed to fetch letter count.");
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <div className="innerContainer">
        <textarea
          className="inputField"
          value={paragraph}
          onChange={e => setParagraph(e.target.value)}
          placeholder="Enter a paragraph"
          rows="4"
        />
        <button
          className="submitButton"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Count Letters
        </button>
        {isLoading && <p className="loadingMessage">Loading...</p>}
        {count && <p>{count}</p>}
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
}

export default App;
