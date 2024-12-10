import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { createRequestListener } from "@mjackson/node-fetch-server";
import compression from "compression";
import express from "express";

import { handleFetch } from "./dist/prerender/entry.prerender.js";

// Configure how to call the server for call-server-prerender.ts
process.env.SERVER_ENTRY = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "dist/server/entry.server.js"
);

const app = express();
app.disable("x-powered-by");

app.use(compression());

app.use(
  express.static("dist/browser/assets", {
    immutable: true,
    maxAge: "1y",
  })
);

app.use(
  express.static("dist/browser", {
    maxAge: "5m",
  })
);

app.use(createRequestListener(handleFetch));

const port = Number.parseInt(process.env.PORT || "3000", 10);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
