import { MCPTool } from './models';
import fs from 'fs';
import path from 'path';
  
  // MCP Generator: Produces a server file with tool definitions
  function mcpServerGenerator(tools: MCPTool[]) {
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

  function packageJsonGenerator() {
    return `
    {
  "name": "mcp-server-name",
  "version": "1.0.0",
  "description": "MCP server",
  "license": "MIT",
  "author": "Anvos",
  "homepage": "",
  "bugs": "",
  "type": "module",
  "bin": {
    "mcp-server-name": "dist/index.js"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc && shx chmod +x dist/*.js",
    "prepare": "npm run build",
    "watch": "tsc --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "1.0.1",
    "@types/node": "^22",
    "@types/node-fetch": "^2.6.12",
    "node-fetch": "^3.3.2",
    "universal-user-agent": "^7.0.2",
    "zod": "^3.22.4",
    "zod-to-json-schema": "^3.23.5"
  },
  "devDependencies": {
   "@types/node": "^22",
    "shx": "^0.3.4",
    "typescript": "^5.6.2"
  }
}
    `.trim();
  }


  function tsconfigGenerator() {
    return `
    {
    "extends": "../../tsconfig.json",
    "compilerOptions": {
      "outDir": "./dist",
      "rootDir": "."
    },
    "include": [
      "./**/*.ts"
    ]
  }
  
    `.trim();
  }

  function readmeGenerator() {
    return `
    # MCP Server

    This is a MCP server for the project.

    Make sure to change the name of the server in the package.json file.

    For reference on how other MCP servers look like, check out the [MCP Server Examples](https://github.com/modelcontextprotocol/servers).
    `;
  }

  function dockerFileGenerator() {
    return `
    FROM node:22.12-alpine AS builder
    # CHANGE THIS TO THE CORRECT PATH

    COPY src/postgres /app   
    COPY tsconfig.json /tsconfig.json

    WORKDIR /app

    RUN --mount=type=cache,target=/root/.npm npm install

    RUN --mount=type=cache,target=/root/.npm-production npm ci --ignore-scripts --omit-dev

    FROM node:22-alpine AS release

    COPY --from=builder /app/dist /app/dist
    COPY --from=builder /app/package.json /app/package.json
    COPY --from=builder /app/package-lock.json /app/package-lock.json

    ENV NODE_ENV=production

    WORKDIR /app

    RUN npm ci --ignore-scripts --omit-dev

    ENTRYPOINT ["node", "dist/index.js"]
    `;
  }
  



  export function buildMCPFolder(tools: MCPTool[], buildPath: string) {
    const serverCode = mcpServerGenerator(tools);
    const packageJson = packageJsonGenerator();
    const tsconfig = tsconfigGenerator();
    const readme = readmeGenerator();
    const dockerFile = dockerFileGenerator();
    // Generate the other files in the folder
    const folderPath = path.join(buildPath,  'mcpServer');
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, 'index.ts'), serverCode);
    fs.writeFileSync(path.join(folderPath, 'package.json'), packageJson);
    fs.writeFileSync(path.join(folderPath, 'tsconfig.json'), tsconfig);
    fs.writeFileSync(path.join(folderPath, 'README.md'), readme);
    fs.writeFileSync(path.join(folderPath, 'Dockerfile'), dockerFile);
  }
  