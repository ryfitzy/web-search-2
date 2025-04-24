import React, { useState } from 'react';
import "./LocalSongSearch.css";
function LocalSongSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [visibleLyrics, setVisibleLyrics] = useState(new Set());

  const handleLocalSongSearch = async () => {
      const res = await fetch(`http://localhost:5000/LocalSongSearch?q=${query}`);
      const data = await res.json();
      setResults(data);
  };
  const toggleLyrics = (index) => {
    const newVisible = new Set(visibleLyrics);
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    setVisibleLyrics(newVisible);
  };
  
  return (
    
    <div className = "LocalSongSearch">
      <header className = "LocalSongSearch-header">
        <h1>Welcome to the Local Song Search Page!</h1>
      </header>
      <div className = "LocalSongSearch-body" >
        <div className = "LocalSongSearch-input-container">
            <input className = "LocalSongSearch-input"
              type = "text"
              value={query}
              onChange={(e) => {setQuery(e.target.value);}}
              placeholder = "what is your search....?"
            />
          <button
              className="LocalSongSearch-button"
              onClick={handleLocalSongSearch}
              >
            Search
          </button>
        </div>
        <div className="LocalSongSearch-results">
          {results.map((song, i) => (
            <div key={i}>
              <h2>Rank#{song.rank}, Song Name  
                <strong>
                    <button
                        onClick={() => toggleLyrics(i)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          fontSize: "1em",
                        }}
                      >
                      : {song.song}
                    </button>
                  </strong>
                  , Year: {song.year}, Artist: {song.artist}</h2>
              <p>
                {song.snippet}
              </p>
              {visibleLyrics.has(i) && (
              <div
                className="lyrics-box"
                style={{
                  marginTop: "0.5em",
                  padding: "0.75em",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "6px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {song.lyrics || "Lyrics not available."}
              </div>
            )}    
            </div>  
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocalSongSearch;