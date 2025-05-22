import http from "http";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express, { type Express } from "express";

import log from "./log";
import config from "./config";
import moduleRoutes from "@/modules";
import { errorHandler } from "./middleware/error-handler";
import NotFoundError from "./errors/NotFoundError";

export class Server {
  private server: Express;

  constructor(server?: Express) {
    this.server = server || express();
  }

  public async start() {
    this.securityMiddleware();
    this.standarMiddleware();
    this.routesMiddleware();
    this.errorHandler();
    this.startServer();
  }

  private securityMiddleware() {
    this.server.set("trust proxy", 1).use(
      morgan("combined", {
        stream: {
          write: (message: string) => log.info(message.trim()),
        },
      })
    );
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }

  private standarMiddleware() {
    this.server.use(compression());
    this.server.use(express.json({ limit: "200mb" }));
    this.server.use(express.urlencoded({ extended: true, limit: "200mb" }));
  }

  private routesMiddleware() {
    this.server.use("/api", moduleRoutes);
  }

  private errorHandler() {
    this.server.use("/{*splat}", (req, res, next) => {
      throw new NotFoundError();
    });
    this.server.use(errorHandler);
  }

  private startHttpServer(httpServer: http.Server) {
    try {
      log.info(`Server has started with process id ${process.pid}`);
      httpServer.listen(config.PORT, () => {
        log.info(`Server running on port ${config.PORT}`);
      });
    } catch (error: unknown) {
      log.error(`Server.startHttpServer() error method: ${error}`);
    }
  }

  private startServer() {
    try {
      const httpServer: http.Server = new http.Server(this.server);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.error(`Server.startServer() error method: ${error}`);
    }
  }
}
