import { buildMCPFolder } from "./generator";
import { mcpToolTransformer } from "./transformers";
import { getAgentConfig } from "../../utils/metadata";

export function generateMCPServer(components: any[], buildPath: string) {
    const tools = components.map(comp => {
        const config = getAgentConfig(comp);
        return mcpToolTransformer({ ...comp, config });
      });

    return buildMCPFolder(tools, buildPath);
}

