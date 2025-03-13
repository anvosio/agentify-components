import React, { ComponentType } from 'react';
import { registerAgentifiedComponent } from '../utils/registry';

interface NavigationBehavior {
  type: 'navigation';
  page: string;
  queryParam: string;
}

interface ApiBehavior {
  type: 'api';
  endpoint: string;
  method: string;
}

type BehaviorConfig = NavigationBehavior | ApiBehavior;

interface AgentifySearchBarConfig {
  behavior: BehaviorConfig;
  selector?: string | null;
  description?: string;
}

/**
 * Higher-order component that adds agentification to search bar components
 * 
 * @param {Object} config - Configuration for the search bar
 * @param {Object} config.behavior - Behavior configuration
 * @param {string} config.behavior.type - 'navigation' or 'api'
 * @param {string} [config.behavior.page] - Target page for navigation search
 * @param {string} [config.behavior.queryParam] - Query parameter name
 * @param {string} [config.behavior.endpoint] - API endpoint for API search
 * @param {string} [config.behavior.method] - HTTP method for API search
 * @returns {Function} - The HOC function
 */
export const agentifySearchBar = (config: AgentifySearchBarConfig) => 
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    return function AgentifiedSearchBar(props: P) {
      // Register the component with the specified configuration
      registerAgentifiedComponent({
        type: 'search-bar',
        behavior: config.behavior,
        selector: config.selector || null,
        description: config.description || 'Search component',
        // capabilities: ['text-search', 'query-enhancement']
      });

      // // Function to handle search based on behavior type
      // const handleSearch = (value) => {
      //   console.log(`Searching: ${value}`);
        
      //   if (config.behavior.type === 'navigation') {
      //     // Handle navigation search (in real implementation)
      //     console.log(`Would navigate to: ${config.behavior.page}?${config.behavior.queryParam}=${value}`);
      //   } else if (config.behavior.type === 'api') {
      //     // Handle API search (in real implementation)
      //     console.log(`Would call API: ${config.behavior.endpoint} with method ${config.behavior.method} and query ${value}`);
      //   }

      //   //   Potential intelligent behavior:
      //     // - Query enhancement
      //     // - Search suggestions
      //     // - Action inference


      //   // Call original onSearch if provided
      //   if (props.onSearch) {
      //     props.onSearch(value);
      //   }
      // };

      // Pass the enhanced handler to the wrapped component
      return <WrappedComponent {...props} />;
    };
  }; 