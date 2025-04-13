import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const server = new McpServer({
  name: "uuid-generator",
  version: "1.0.0",
});

server.tool(
  "generate_uuid",
  "新しいUUIDを生成して返します",
  z.object({}).shape,
  async () => {
    // debug
    console.log("UUID生成リクエストを受信しました");
    // UUIDを生成
    return {
      content: [{ type: "text", text: uuidv4() }],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport).catch((err) => {
  console.error("MCPサーバー起動エラー:", err);
  process.exit(1);
});
