import 'reflect-metadata';

const AGENT_CONFIG_KEY = Symbol('agentConfig');

// Decorator to attach MCP config to a class
export function AgentConfig(config: any) {
  return function (target: Function) {
    // @ts-ignore - Reflect.defineMetadata comes from reflect-metadata package
    Reflect.defineMetadata(AGENT_CONFIG_KEY, config, target);
  };
}

export { AGENT_CONFIG_KEY };
