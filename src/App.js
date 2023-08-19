import React, { useState } from 'react';
import "./App.css"



function App() {
  const [searchText, setSearchText] = useState('');
  const [paragraph, setParagraph] = useState(
    `He ordered his regular breakfast. Two eggs sunnyside up, hash browns, and two strips of bacon. He continued to look at the menu wondering if this would be the day he added something new. This was also part of the routine. A few seconds of hesitation to see if something else would be added to the order before demurring and saying that would be all. It was the same exact meal that he had ordered every day for the past two years.`
  );

  const [highlighted, setHighlighted] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    if (highlighted) {
      clearHighlight();
    }
  };

  const clearHighlight = () => {
    setParagraph(paragraph.replace(/<\/?span[^>]*>/g, ''));
    setHighlighted(false);
  };

  const search = () => {
    if (!highlighted) {
      const escapedText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(escapedText, 'gi');
      const highlightedParagraph = paragraph.replace(
        pattern,
        match => `<span class="highlight">${match}</span>`
      );
      setParagraph(highlightedParagraph);
      setHighlighted(true);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <input
          type="text"
          id="text-to-search"
          placeholder="Enter text to search.."
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <button onClick={search}>{highlighted ? 'Clear' : 'Search'}</button>
      </div>
      <p
        id="paragraph"
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    </div>
  );
}

export default App;