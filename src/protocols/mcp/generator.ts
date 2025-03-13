import { MCPTool } from './models';
  
  // MCP Generator: Produces a server file with tool definitions
  export function mcpServerGenerator(tools: MCPTool[]) {
    const toolDefinitions = tools.map(tool => `
  const ${tool.name}: Tool = {
    name: "${tool.name}",
    description: "${tool.description}",
    inputSchema: ${JSON.stringify(tool.inputSchema, null, 2)}
  };
    `).join('\n');
  
    return `
  import { Server } from "@modelcontextprotocol/sdk/server/index.js";
  import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
  import {
    CallToolRequest,
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
  } from "@modelcontextprotocol/sdk/types.js";
  
  ${toolDefinitions}
  
  async function main() {
    const server = new Server(
      {
        name: "MCP Server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
  
    // Handle CallToolRequest to execute tools
    server.setRequestHandler(
      CallToolRequestSchema,
      async (request: CallToolRequest) => {
        console.log("Received CallToolRequest:", request);
        // Placeholder for tool execution logic
        return { content: [{ type: "text", text: "Tool execution placeholder" }] };
      }
    );
  
    // Handle ListToolsRequest to return available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      console.log("Received ListToolsRequest");
      return {
        tools: [${tools.map(tool => tool.name).join(', ')}],
      };
    });
  
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP Server running on stdio");
  }
  
  main().catch(console.error);
    `.trim();
  }