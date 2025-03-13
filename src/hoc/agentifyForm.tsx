import React, { ComponentType } from 'react';
import { registerAgentifiedComponent } from '../utils/registry';

interface FieldConfig {
  // Define field properties based on your needs
  name: string;
  type: string;
  [key: string]: any;
}

interface BehaviorConfig {
  type: 'navigation' | 'api';
  action?: string;
  method?: string;
  endpoint?: string;
}

interface AgentifyFormConfig {
  behavior: BehaviorConfig;
  fields: FieldConfig[];
  purpose?: string;
  selector?: string | null;
  description?: string;
}

/**
 * Higher-order component that adds agentification to form components
 * 
 * @param {Object} config - Configuration for the form
 * @param {Object} config.behavior - Behavior configuration
 * @param {string} config.behavior.type - 'navigation' or 'api'
 * @param {string} [config.behavior.action] - Form action for navigation forms
 * @param {string} [config.behavior.method] - HTTP method (GET, POST, etc.)
 * @param {string} [config.behavior.endpoint] - API endpoint for API forms
 * @param {Array} config.fields - Array of field objects
 * @param {string} [config.purpose] - Purpose of the form (e.g., 'login', 'signup')
 * @returns {Function} - The HOC function
 */
export const agentifyForm = (config: AgentifyFormConfig) => 
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    return function AgentifiedForm(props: P) {
      // Register the component with the specified configuration
      registerAgentifiedComponent({
        type: 'form',
        behavior: config.behavior,
        fields: config.fields,
        purpose: config.purpose || 'unknown',
        selector: config.selector || null,
        description: config.description || 'Form component'
      });

      // Function to handle form submission based on behavior type
      // const handleSubmit = (values) => {
      //   console.log(`Form submitted with values:`, values);
        
      //   if (config.behavior.type === 'navigation') {
      //     // Handle navigation form (in real implementation)
      //     console.log(`Would submit to: ${config.behavior.action} with method ${config.behavior.method}`);
      //   } else if (config.behavior.type === 'api') {
      //     // Handle API form (in real implementation)
      //     console.log(`Would call API: ${config.behavior.endpoint} with method ${config.behavior.method}`);
      //   }
        
      //   // Call original onSubmit if provided
      //   if (props.onSubmit) {
      //     props.onSubmit(values);
      //   }
        
      //   return config.behavior; // Return the behavior for potential chaining
      // };

      // Pass the enhanced handler to the wrapped component
      // return <WrappedComponent {...props} onSubmit={handleSubmit} />;
      return <WrappedComponent {...props} />;
    };
  }; 