import React, { ComponentType, JSX } from 'react';
import { registerAgentifiedComponent } from '../utils/registry'; // Adjust path as needed

interface AgentifyButtonConfig {
  behavior: string;
  label: string;
  selector?: string | null;
  description?: string;
}

export const agentifyButton = (config: AgentifyButtonConfig) => 
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    // Add return type annotation
    return function AgentifiedButton(props: P): JSX.Element {
      registerAgentifiedComponent({
        type: 'button',
        behavior: config.behavior,
        label: config.label,
        selector: config.selector || null,
        description: config.description || 'Button component'
      });
      
      return <WrappedComponent {...props} />;
    };
  }; 