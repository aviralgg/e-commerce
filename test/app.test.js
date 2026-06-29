import assert from "node:assert";
import http from "node:http";
import { once } from "node:events";
import { test } from "node:test";
import { app } from "../src/app.js";

const createServer = () => {
  const server = http.createServer(app);
  server.listen(0, "127.0.0.1");
  return once(server, "listening").then(() => ({
    server,
    port: server.address().port,
  }));
};

test("GET /health returns 200 and ok response", async () => {
  const { server, port } = await createServer();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.strictEqual(response.status, 200);

    const body = await response.json();
    assert.deepStrictEqual(body, { ok: true });
  } finally {
    server.close();
  }
});
