import Redis from "ioredis";

import log from "./log";
import { RedisConnectError } from "./errors/RedisConnectError";

export class RedisCache {
  static _client: Redis | null;
  private isConnecting = false;
  private reconnectInterval = 5000;

  constructor(private url: string) {}

  async connect() {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      const connection = new Redis(this.url, {
        lazyConnect: true, // tắt auto connect
        retryStrategy: () => null, // Tắt retry tự động
      });

      await connection.connect();

      this.isConnecting = false;
      log.info("✅ Redis connected");
      RedisCache._client = connection;

      connection.on("error", (err) => {
        log.error(`❌ Redis error: ${err.message}`);
      });

      connection.on("close", async () => {
        log.warn("❌ Redis connection closed. Attempting manual reconnect...");
        RedisCache._client = null;
        await this.reconnect();
      });
    } catch (error: unknown) {
      this.isConnecting = false;
      log.error(`connect Redis error: ${error}`);
      throw new RedisConnectError();
    }
  }

  private async reconnect() {
    while (!RedisCache._client) {
      try {
        log.info("⏳ Trying to reconnect to Redis...");
        await this.connect();
      } catch (err) {
        log.error(
          `Reconnect attempt failed. Retrying in ${
            this.reconnectInterval / 1000
          }s...`
        );
        await this.sleep(this.reconnectInterval);
      }
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static get client(): Redis {
    if (!RedisCache._client) {
      throw new Error("Redis connection not established");
    }
    return RedisCache._client;
  }
}
