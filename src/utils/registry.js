/**
 * Registry for agentified components
 * Stores metadata about components and generates configuration for MCP
 */

// Store for component metadata
const componentRegistry = [];

/**
 * Generates a unique ID for registered components
 * @returns {string} A unique identifier
 */
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Validates component metadata based on its type
 * @param {object} metadata - The component metadata to validate
 * @returns {boolean} True if valid, throws error if invalid
 */
const validateMetadata = (metadata) => {
  if (!metadata.type) {
    throw new Error('Component metadata must include a type');
  }
  
  // Type-specific validation
  switch (metadata.type) {
    case 'search-bar':
      if (!metadata.behavior || !metadata.behavior.type) {
        throw new Error('Search bar metadata must include behavior type');
      }
      if (metadata.behavior.type === 'navigation' && (!metadata.behavior.page || !metadata.behavior.queryParam)) {
        throw new Error('Navigation search bar must specify page and queryParam');
      }
      if (metadata.behavior.type === 'api' && (!metadata.behavior.endpoint || !metadata.behavior.method)) {
        throw new Error('API search bar must specify endpoint and method');
      }
      break;
      
    case 'form':
      if (!metadata.behavior || !metadata.behavior.type) {
        throw new Error('Form metadata must include behavior type');
      }
      if (!metadata.fields || !Array.isArray(metadata.fields) || metadata.fields.length === 0) {
        throw new Error('Form metadata must include fields array');
      }
      if (metadata.behavior.type === 'navigation' && (!metadata.behavior.action || !metadata.behavior.method)) {
        throw new Error('Navigation form must specify action and method');
      }
      if (metadata.behavior.type === 'api' && (!metadata.behavior.endpoint || !metadata.behavior.method)) {
        throw new Error('API form must specify endpoint and method');
      }
      break;
      
    case 'button':
      if (!metadata.behavior || !metadata.behavior.type) {
        throw new Error('Button metadata must include behavior type');
      }
      if (!metadata.label) {
        throw new Error('Button metadata must include a label');
      }
      if (metadata.behavior.type === 'navigation' && !metadata.behavior.href) {
        throw new Error('Navigation button must specify href');
      }
      if (metadata.behavior.type === 'api' && (!metadata.behavior.endpoint || !metadata.behavior.method)) {
        throw new Error('API button must specify endpoint and method');
      }
      if (metadata.behavior.type === 'ui' && (!metadata.behavior.action || !metadata.behavior.target)) {
        throw new Error('UI button must specify action and target');
      }
      break;
      
    default:
      throw new Error(`Unknown component type: ${metadata.type}`);
  }
  
  return true;
};

/**
 * Register an agentified component in the registry
 * @param {object} metadata - Component metadata
 * @returns {object} The registered component metadata
 */
export const registerAgentifiedComponent = (metadata) => {
  // Validate the metadata
  validateMetadata(metadata);
  
  // Add to registry with additional metadata
  const registeredComponent = {
    id: generateUniqueId(),
    ...metadata,
    registeredAt: new Date().toISOString()
  };
  
  componentRegistry.push(registeredComponent);
  
  // Log to console during development
  if (process.env.NODE_ENV === 'development') {
    console.log('Registered agentified component:', metadata);
  }
  
  return registeredComponent;
};

/**
 * Get all registered components
 * @returns {Array} Array of registered components
 */
export const getRegisteredComponents = () => {
  return [...componentRegistry];
};




/**
 * Clear the registry
 */
export const clearRegistry = () => {
  componentRegistry.length = 0;
}; 