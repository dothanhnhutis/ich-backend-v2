import { Server } from "./shared/server";

class Application {
  initialize() {
    const server: Server = new Server();
    server.start();
  }
}
const app = new Application();
app.initialize();
