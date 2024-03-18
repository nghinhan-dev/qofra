import "dotenv/config";
import { createServer } from "http";
import { createApp } from "./src/createApp.mjs";

const httpServer = createServer();

(async () => {
  await createApp(httpServer);
  httpServer.listen(process.env.PORT || 5000, () =>
    console.log(`Rocking on ${process.env.PORT} 🚀`)
  );
})();
