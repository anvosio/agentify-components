// MCP-specific configuration interface
interface MCPConfigOptions {
    type: string; // e.g., 'button', 'form'
    behavior: {
      type: string; // e.g., 'navigation', 'api'
      [key: string]: any; // Additional behavior properties
    };
    label?: string;
    description: string;
    inputSchema?: {
      type: string;
      properties: Record<string, { type: string }>;
      required?: string[];
    };
  }

  type MCPTool = {
    name: string;
    description: string;
    inputSchema: {
      type: string;
      properties: Record<string, { type: string }>;
      required?: string[];
    };
  };


  export type { MCPConfigOptions, MCPTool };