import React from 'react';
import { agentifyButton, agentifySearchBar, agentifyForm } from '@anvos/agentify-components';

// Simple button component
const SimpleButton = (props) => {
  return (
    <button 
      onClick={props.onClick}
      className={props.className || "test-button"}
    >
      {props.children || 'Click Me'}
    </button>
  );
};

// Simple search bar component
const SimpleSearchBar = (props) => {
  return (
    <div className="search-container">
      <input
        type="search"
        onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
        placeholder={props.placeholder || "Search..."}
        className="search-input"
      />
      <button className="search-button">Search</button>
    </div>
  );
};

// Simple form component
const SimpleForm = (props) => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="simple-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

// Agentified components
export const AgentifiedButton = agentifyButton({
  behavior: {
    type: 'ui',
    action: 'log-click',
  },
  label: 'Test Button',
  description: 'A button for testing the agentify package'
})(SimpleButton);

export const AgentifiedSearchBar = agentifySearchBar({
  behavior: {
    type: 'api',
    endpoint: '/api/search',
    method: 'GET',
    queryParam: 'q'
  },
  selector: '#test-search',
  description: 'Test search bar for searching products'
})(SimpleSearchBar);

export const AgentifiedForm = agentifyForm({
  behavior: {
    type: 'api',
    endpoint: '/api/login',
    method: 'POST'
  },
  fields: [
    { name: 'username', type: 'text', required: true },
    { name: 'password', type: 'password', required: true }
  ],
  purpose: 'user-authentication',
  description: 'Login form for testing agentify components'
})(SimpleForm); 