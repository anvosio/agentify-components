import { ComponentConfig, Tool } from './models';

// Helper function to generate a Tool from a ComponentConfig
function generateTool(config: ComponentConfig): Tool {
    const toolName = `agent_${config.type.replace('-', '_')}`;
    const description = config.description || `Tool for ${config.type}`;
    const inputSchema: {
        type: "object";
        properties: Record<string, { type: string }>;
        required: string[];
    } = {
        type: "object",
        properties: {},
        required: [],
    };

    // Populate input schema based on config fields, if available
    if (config.fields) {
        config.fields.forEach(field => {
            inputSchema.properties[field.name] = { type: field.type };
            if (field.required) {
                inputSchema.required.push(field.name);
            }
        });
    }

    return {
        name: toolName,
        description,
        inputSchema,
    };
}

// Function to generate the MCP server template string
function mcpServerTemplate(tools: Tool[]): string {
    // Generate individual tool definitions
    const toolDefinitions = tools.map(tool => `
const ${tool.name}: Tool = {
    name: "${tool.name}",
    description: "${tool.description}",
    inputSchema: ${JSON.stringify(tool.inputSchema, null, 4)}
};
    `).join('\n');

    // Create a comma-separated list of tool names for the ListTools response
    const toolList = tools.map(tool => tool.name).join(', ');

    // Return the complete MCP server template as a string
    return `
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequest,
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from "@modelcontextprotocol/sdk/types.js";

// Tool definitions
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
            tools: [${toolList}],
        };
    });

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP Server running on stdio");
}

main().catch(console.error);
    `.trim();
}

// Export function to generate the final MCP server template
export function generateMCPServer(components: ComponentConfig[]) {
    const tools = components.map(generateTool);
    const serverTemplate = mcpServerTemplate(tools);
    return serverTemplate;
}