# Agentify Components

[![npm version](https://img.shields.io/badge/npm-v0.0.1-blue.svg)](https://www.npmjs.com/package/@anvos/agentify-components)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A framework for adding semantic metadata to React components, making them "agent-aware" for AI systems and automation tools.

# NOT FINISHED

## Overview

Agentify Components solves the problem of making UI components understandable to AI agents. When AI assistants interact with web applications, they typically lack context about what components do, how to interact with them, and what data they handle.

This framework adds a semantic layer to your components through higher-order components (HOCs) that:

1. **Register component metadata** - Define what a component does and how it behaves
2. **Provide a standardized schema** - Create consistent metadata structures for different component types
3. **Generate configuration files** - Create MCP (Mission Control Protocol) configurations at build time

> 🚀 **Note:** This framework focuses on *component metadata* rather than behavior modification. It makes your components "self-describing" to AI systems without changing their functionality.

## Installation

```bash
npm install @anvos/agentify-components
```

## Core Concepts

### Component Types

Agentify currently supports three main component types:

- **Search Bars** - For search inputs with navigation or API behavior
- **Forms** - For data collection with field-level metadata
- **Buttons** - For actions with navigation, API, or UI interaction behaviors

### Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an open standard developed by Anthropic to connect AI models with external data sources and tools. It uses a client-server architecture, allowing AI assistants to access live data from various systems like Google Drive, Slack, or databases, enhancing their responses with up-to-date context134. MCP simplifies integrations by providing a universal protocol for secure and standardized connections, replacing custom API connectors with reusable MCP servers

## Usage

### Agentifying a Search Bar

```jsx
import React from 'react';
import { agentifySearchBar } from '@anvos/agentify-components';

// Your original search component
const MySearchBar = (props) => (
  <input 
    type="search" 
    onChange={(e) => props.onSearch?.(e.target.value)}
    placeholder="Search..." 
  />
);

// Add semantic metadata
export const ProductSearch = agentifySearchBar({
  behavior: {
    type: 'api',
    endpoint: '/api/products/search',
    method: 'GET',
    queryParam: 'term'
  },
  description: 'Search for products in the catalog',
  selector: '#product-search'
})(MySearchBar);
```

### Agentifying a Form

```jsx
import React from 'react';
import { agentifyForm } from '@anvos/agentify-components';

// Your original form component
const LoginForm = (props) => (
  <form onSubmit={props.onSubmit}>
    {/* Form fields */}
    <input type="text" name="username" />
    <input type="password" name="password" />
    <button type="submit">Login</button>
  </form>
);

// Add semantic metadata
export const AgentAwareLoginForm = agentifyForm({
  behavior: {
    type: 'api',
    endpoint: '/api/auth/login',
    method: 'POST'
  },
  fields: [
    { name: 'username', type: 'text', required: true },
    { name: 'password', type: 'password', required: true }
  ],
  purpose: 'user-authentication',
  description: 'User login form for account access'
})(LoginForm);
```

### Agentifying a Button

```jsx
import React from 'react';
import { agentifyButton } from '@anvos/agentify-components';

// Your original button component
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.children}
  </button>
);

// Add semantic metadata
export const CheckoutButton = agentifyButton({
  behavior: {
    type: 'navigation',
    href: '/checkout'
  },
  label: 'Proceed to Checkout',
  description: 'Navigate to checkout page to complete purchase'
})(Button);
```

## Generating MCP Configuration

During your build process, you can generate an MCP configuration file. Add these scripts to your package.json:

```javascript
"scripts": {
  "build:mcp": "agentify-mcp-build",
  "deploy:mcp": "agentify-mcp-deploy"
}
```

Then run the build command to generate your MCP configuration:

```bash
npm run build:mcp
```

This will scan your codebase for agentified components and generate an MCP server configuration file in the `/mcp` directory.

To deploy your MCP server:

```bash
npm run deploy:mcp
```

This will deploy your MCP server to the Anvos community MCP servers on GitHub where users can easily access it. Your configuration will be available via a unique URL that you can share with AI systems and tools that support the MCP protocol.


## Component Configuration Options

See the [setup guide](docs/setup.md) for detailed configuration options for each component type.

## Documentation

- [Setup Guide](docs/setup.md) - Detailed instructions and configuration options
- [Product Requirements Document](docs/product-requirements.md) - Full project specification and roadmap

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 



----------


Rewrite

Overview of the Framework
The framework consists of four main parts:

Decorator (@AgentConfig): Attaches metadata to components, including common fields and protocol-specific configurations.
Transformers: Adapt the generic metadata into protocol-specific formats (e.g., for protocols like MCP or XYZ).
Generators: Produce server file content based on the transformed configurations, tailored to each protocol.
CLI Tool: Processes components, applies the appropriate transformer and generator based on the target protocol, and outputs the server file.
This design ensures flexibility—developers can define components once and support multiple protocols by adding new transformers and generators as needed.
