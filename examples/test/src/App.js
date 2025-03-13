import React, { useState } from 'react';
import './App.css';
import { AgentifiedButton, AgentifiedSearchBar, AgentifiedForm } from './TestComponent';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Handle button click
  const handleButtonClick = () => {
    console.log('Button clicked!');
    setNotifications([...notifications, 'Button clicked!']);
  };
  
  // Handle search
  const handleSearch = (query) => {
    console.log(`Search query: ${query}`);
    setSearchResults([
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ]);
    setNotifications([...notifications, `Searched for: ${query}`]);
  };
  
  // Handle form submission
  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    setNotifications([...notifications, `Logged in as: ${data.username}`]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing Agentify Components</h1>
        
        <div className="component-section">
          <h2>Agentified Button</h2>
          <AgentifiedButton onClick={handleButtonClick}>
            Test Button
          </AgentifiedButton>
        </div>
        
        <div className="component-section">
          <h2>Agentified Search Bar</h2>
          <AgentifiedSearchBar 
            onSearch={handleSearch}
            placeholder="Search for products..."
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results:</h3>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="component-section">
          <h2>Agentified Form</h2>
          <AgentifiedForm onSubmit={handleFormSubmit} />
        </div>
        
        {notifications.length > 0 && (
          <div className="notifications">
            <h3>Notifications:</h3>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
