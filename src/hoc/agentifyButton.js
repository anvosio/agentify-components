import React, { useEffect } from 'react';
import { registerAgentifiedComponent } from '../utils/registry';

/**
 * Higher-order component that adds agentification to button components
 * 
 * @param {Object} config - Configuration for the button
 * @param {Object} config.behavior - Behavior configuration
 * @param {string} config.behavior.type - 'navigation', 'api', or 'ui'
 * @param {string} [config.behavior.href] - Target URL for navigation buttons
 * @param {string} [config.behavior.endpoint] - API endpoint for API buttons
 * @param {string} [config.behavior.method] - HTTP method for API buttons
 * @param {string} [config.behavior.action] - UI action for UI buttons
 * @param {string} [config.behavior.target] - Target selector for UI buttons
 * @param {string} config.label - Button label/text
 * @returns {Function} - The HOC function
 */
export const agentifyButton = (config) => (WrappedComponent) => {
  return function AgentifiedButton(props) {
      // Register the component with the specified configuration
      registerAgentifiedComponent({
        type: 'button',
        behavior: config.behavior,
        label: config.label,
        selector: config.selector || null,
        description: config.description || 'Button component'
      });

    // Function to handle button click based on behavior type
    // const handleClick = (event) => {
    //   console.log(`Button clicked: ${config.label}`);
      
    //   if (config.behavior.type === 'navigation') {
    //     // Handle navigation button (in real implementation)
    //     console.log(`Would navigate to: ${config.behavior.href}`);
    //   } else if (config.behavior.type === 'api') {
    //     // Handle API button (in real implementation)
    //     console.log(`Would call API: ${config.behavior.endpoint} with method ${config.behavior.method}`);
    //   } else if (config.behavior.type === 'ui') {
    //     // Handle UI button (in real implementation)
    //     console.log(`Would perform UI action: ${config.behavior.action} on ${config.behavior.target}`);
    //   }
      
    //   // Call original onClick if provided
    //   if (props.onClick) {
    //     props.onClick(event);
    //   }
    // };

    // Pass the enhanced handler to the wrapped component
    // return <WrappedComponent {...props} onClick={handleClick} />;
    return <WrappedComponent {...props} />;
  };
}; 