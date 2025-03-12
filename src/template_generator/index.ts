// by default, the template generator will generate a MCP server template

import { generateMCPServer } from "./mcp/index";
import { getRegisteredComponents } from "../utils/registry";

export function generateTemplate(type: string) {
    const components = getRegisteredComponents();
    if (type === 'mcp' || type === '') {
        return generateMCPServer(components);
    }
}