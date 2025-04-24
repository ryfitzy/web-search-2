import React, { useState } from 'react';
import "./WebSearch.css";
function WebSearch() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:5000/WebSearch?q=${query}`);
    const data = await res.json();
    setSearchResult(data.items || []);
  };
  return (
    
    <div className = "WebSearch">
      <header className = "WebSearch-header">
        <h1>Welcome to the Web Search Page!</h1>
      </header>
      <div className = "WebSearch-body" >
        <div className = "WebSearch-input-container">
            <input className = "WebSearch-input"
              type = "text"
              value={query}
              onChange={(e) => {setQuery(e.target.value);}}
              placeholder = "what is your search....?"
            />
          <button
              className="WebSearch-button"
              onClick={handleSearch}
              >
            Search
          </button>
        </div>
        {searchResult && (
        <div className="WebSearch-result">
          <h2>Results for "{query}":</h2>
          <ul className="WebSearch-results">
            {searchResult.map((item, index) => (
              <li key={index} className="result-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="result-link">
                  <h3> {item.title}</h3>
                  <p>{item.snippet}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}

export default WebSearch;