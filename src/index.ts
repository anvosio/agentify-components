/**
 * Agentify Framework - Main Entry Point
 * A lightweight framework to make your components smarter with agent metadata.
 */

// Export the higher-order components
export { agentifySearchBar } from './hoc/agentifySearchBar';
export { agentifyForm } from './hoc/agentifyForm';
export { agentifyButton } from './hoc/agentifyButton';

// Export the registry utilities
export { 
  registerAgentifiedComponent,
  getRegisteredComponents,
  clearRegistry
} from './utils/registry'; 

// Export the MCP server template generator
export { generateMCPServer } from './template_generator/mcp';