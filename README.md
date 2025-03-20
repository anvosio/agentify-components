# Agentify Components

[![npm version](https://img.shields.io/badge/npm-v0.1.0-blue.svg)](https://www.npmjs.com/package/@anvos/agentify-components)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A framework for adding semantic metadata to React components, making them "agent-aware" for AI systems and automation tools.



## Overview

Agentify Components solves the problem of making UI components understandable to AI agents. When AI assistants interact with web applications, they typically lack context about what components do, how to interact with them, and what data they handle.

This framework adds a semantic layer to your components through decorators that:

1. **Register component metadata** - Define what a component does and how it behaves
2. **Provide a standardized schema** - Create consistent metadata structures for different component types
3. **Generate configuration files** - Create an MCP server at build time

> 🚀 **Note:** This framework focuses on *component metadata* rather than behavior modification. It makes your components "self-describing" to AI systems without changing their functionality.

## Installation

```bash
npm install @anvosio/agentify-components
```

## Roadmap

Right now, this only generates an MCP server. The next most important milestone among other things is enabling to build local tools that can be passed to llms along with the other bunch of tools that your already building

This lets you have both frontend tools and backend tools


# NOT FINISHED! Last updated 14th march, 2025

## Core Concepts

### Component Types

Agentify currently supports three main component types: (THE BELOW HAVE BEEN REMOVED AND INSTEAD LIMITED TO API AND NAVIGATION BEHAVIOURS FOR NOW)

- **Search Bars** - For search inputs with navigation or API behavior
- **Forms** - For data collection with field-level metadata
- **Buttons** - For actions with navigation, API, or UI interaction behaviors

### Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an open standard developed by Anthropic to connect AI models with external data sources and tools. It uses a client-server architecture, allowing AI assistants to access live data from various systems like Google Drive, Slack, or databases, enhancing their responses with up-to-date context134. MCP simplifies integrations by providing a universal protocol for secure and standardized connections, replacing custom API connectors with reusable MCP servers

### Framework Architecture

The framework consists of four main parts:

1. **Decorator (@AgentConfig)** - Attaches metadata to components, including common fields and protocol-specific configurations
2. **Transformers** - Adapt the generic metadata into protocol-specific formats (e.g., for protocols like MCP for now but will be extended to other protocols in the future)
3. **Generators** - Produce server file content based on the transformed configurations, tailored to each protocol
4. **CLI Tool** - Processes components, applies the appropriate transformer and generator based on the target protocol, and outputs the server file

This architecture ensures flexibility—developers can define components once and support multiple protocols by adding new transformers and generators as needed.

## Usage

### Specific type Component Agentification Examples (NEEDS TO BE UPDATED) 


#### Agentifying a Search Bar

```jsx
import React from 'react';
import { AgentConfig } from '@anvos/agentify-components';

// Add semantic metadata using decorator
@AgentConfig({
  type: 'search',
  behavior: {
    type: 'api',
    endpoint: '/api/products/search',
    method: 'GET',
    queryParam: 'term'
  },
  description: 'Search for products in the catalog',
 
})
export class ProductSearch extends React.Component {
  render() {
    return (
      <input 
        type="search" 
        onChange={(e) => this.props.onSearch?.(e.target.value)}
        placeholder="Search..." 
      />
    );
  }
}
```

#### Agentifying a Form

```jsx
import React from 'react';
import { AgentConfig } from '@anvos/agentify-components';

// Add semantic metadata using decorator
@AgentConfig({
  type: 'form',
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
})
export class LoginForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        {/* Form fields */}
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    );
  }
}
```

#### Agentifying a Button

```jsx
import React from 'react';
import { AgentConfig } from '@anvos/agentify-components';

// Add semantic metadata using decorator
@AgentConfig({
  type: 'button',
  behavior: {
    type: 'navigation',
    href: '/checkout'
  },
  label: 'Proceed to Checkout',
  description: 'Navigate to checkout page to complete purchase'
})
export class CheckoutButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
```


### Generic Component Agentification Examples

The `@anvos/agentify-components` package provides several ways to add agent configuration to your React components:

#### Example 1: Functional Component with HOC

For functional components, you can use the `withAgentConfig` higher-order component to wrap your component with agent configuration:

```tsx
import { withAgentConfig } from '@anvos/agentify-components';

export const LoginButton = withAgentConfig({
  type: 'button',
  behavior: { type: 'api', endpoint: '/api/login', method: 'POST' },
  label: 'Login Button',
  selector: '#login-btn',
  description: 'Submits login form via API'
})(() => {
  return <button id="login-btn">Login</button>;
});
```

#### Example 2: Functional Component with Direct Property Assignment

Alternatively, you can create a functional component and directly assign the `agentConfig` property:

```tsx
import { AgentComponent } from '@anvos/agentify-components';

export const LoginButton2: AgentComponent = () => {
  return <button id="login-btn">Login</button>;
};

LoginButton2.agentConfig = {
  type: 'button',
  behavior: { type: 'api', endpoint: '/api/login', method: 'POST' },
  label: 'Login Button',
  description: 'Submits login form via API'
};
```

#### Example 3: Class Component with Decorator

For class components, you can use the `@AgentConfig` decorator directly:

```tsx
import { AgentConfig } from '@anvos/agentify-components';

@AgentConfig({
  type: 'button',
  behavior: { type: 'navigation', href: '/home' },
  label: 'Home Button',
  description: 'Navigates to the home page'
})
class HomeButton extends React.Component {
  render() {
    return <button id="home-btn">Home</button>;
  }
}

export { HomeButton };
```

### When to Use Each Approach

- **HOC Pattern (Example 1)**: Best for when you need to apply agent configuration to existing functional components or when you want to maintain separation between the component and its configuration.
- **Direct Property Assignment (Example 2)**: Simplest approach for functional components, useful when the component is defined and configured in the same file.
- **Decorator Pattern (Example 3)**: Most elegant option for class components, providing a clean syntax with TypeScript decorators.

### MCP Tool Schema Type Mappings

When generating the MCP server, the following JSON Schema to Zod type mappings are used:

| JSON Schema Type | Zod Schema Type |
|-----------------|----------------|
| `string`        | `z.string()`   |
| `number`        | `z.number()`   |
| `boolean`       | `z.boolean()`  |
| `array`         | `z.array(z.string())` |
| `object`        | `z.object({})` |
| `integer`       | `z.number()`   |
| `float`         | `z.number()`   |
| `date`          | `z.date()`     |
| `datetime`      | `z.date()`     |
| `time`          | `z.date()`     |

These mappings are used when converting the component metadata to the appropriate format for the MCP server tools.


## Generating MCP Server

Add generate.ts file to the root of the project and add the following code:

```javascript
import { generateMCPServer } from '@anvos/agentify-components';
import * as components from './components/ButtonExample';

const componentList = Object.values(components);

console.log(componentList);
generateMCPServer(componentList, './mcpServer');

```

Now, add the following scripts to your package.json:

```javascript
"scripts": {
  "build:mcp": "ts-node ./generate.ts",
  "deploy:mcp": "echo 'STILL WORKING ON IT'"
}
```

This will scan your codebase for agentified components and generate an MCP server in the `/mcpServer` directory.

To deploy your MCP server:

```bash
npm run deploy:mcp
```

This will deploy your MCP server to the Anvos community MCP servers on GitHub where users can easily access it. Your configuration will be available via a unique URL that you can share with AI systems and tools that support the MCP protocol.

I also intend to take it a step further and make it so that only the needed tools for the client will be retuned back instead of the entire MCP server because this would lead to overfill of the MCP client with unnecessary tools.


## Component Configuration Options

See the [setup guide](docs/setup.md) for detailed configuration options for each component type.

## Documentation

- [Setup Guide](docs/setup.md) - Detailed instructions and configuration options
- [Product Requirements Document](docs/product-requirements.md) - Full project specification and roadmap

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

