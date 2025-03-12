export interface ComponentConfig {
    type: string;
    behavior: { type: "api" | "navigation"; method: string; endpoint: string };
    fields: { name: string; type: string, required?: boolean }[];
    purpose?: string;
    selector?: string;
    description?: string;
  }
  
  export interface Tool {
    name: string;
    description: string;
    inputSchema: {
      type: "object";
      properties: Record<string, { type: string }>;
      required: string[];
    };
  }
  