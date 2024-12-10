import {
  createFromFetch,
  createFromReadableStream,
  // @ts-expect-error - no types yet
} from "@jacob-ebey/react-server-dom-vite/client";
import { startTransition, StrictMode, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { rscStream } from "rsc-html-stream/client";

// @ts-expect-error - no types yet
import { manifest } from "virtual:@jacob-ebey/vite-react-server-dom/client-api";

import type { ServerPayload } from "./entry.server.js";
import { api, callServer } from "./browser-references.js";

hydrateApp();

function Shell(props: { root: React.JSX.Element }) {
  const [root, setRoot] = useState(props.root);
  api.updateRoot = setRoot;
  return root;
}

async function hydrateApp() {
  const payload: ServerPayload = await createFromReadableStream(
    rscStream,
    manifest,
    { callServer }
  );

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <Shell root={payload.root} />
      </StrictMode>,
      {
        formState: payload.formState,
      }
    );
  });
}
