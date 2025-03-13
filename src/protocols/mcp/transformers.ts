import { MCPConfigOptions, MCPTool } from './models';

// MCP Transformer: Produces a tool definition for MCP protocol
export function mcpToolTransformer(config: MCPConfigOptions): MCPTool {

    // TODO: For the first version, let this be but the next version, 
    // we can add customization for the tool on how it is generated

    // Read personal_notes.md for more details



  return {
    name: `agent_${config.type}`,   // Unique identifier for the tool
    description: config.description || `Tool for ${config.type}`,  // Human-readable description
    inputSchema: config.inputSchema || {    
      type: 'object',  // JSON Schema for the tool's parameters
      properties: {},  // Tool-specific parameters
      required: []
    }
  };
}


// EXAMPLES

// {
//     name: "github_create_issue",
//     description: "Create a GitHub issue",
//     inputSchema: {
//       type: "object",
//       properties: {
//         title: { type: "string" },
//         body: { type: "string" },
//         labels: { type: "array", items: { type: "string" } }
//       }
//     }
//   }


//   {
//     name: "execute_command",
//     description: "Run a shell command",
//     inputSchema: {
//       type: "object",
//       properties: {
//         command: { type: "string" },
//         args: { type: "array", items: { type: "string" } }
//       }
//     }
//   }