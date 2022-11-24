const redis = require("redis");
const NodeCache = require("node-cache");

class CacheClient {
  static _clientMode;
  static _redisClient;
  static _nodeClient;

  static get client() {
    return this._clientMode === "production"
      ? this._redisClient
      : this._nodeClient;
  }

  static get env() {
    return this._clientMode;
  }

  static async init() {
    const env =
      process.env.CACHE_ENV ||
      process.env.NODE_ENV ||
      "development";

    if (!["development", "production"].includes(env))
      throw new Error(
        "Invalid Caching Environment, expected - ['development', 'production'], received - " +
          env
      );

    this._clientMode = env;

    const redisUrl = process.env.REDIS_URL || "";

    if (env === "production") {
      this._redisClient = redis.createClient({
        url: redisUrl,
        name: "redis",
      });
      this._redisClient.connect();
    }

    // creating in memory cache is production ?
    // need to check any performance issues, but since will not be used, better to not instantiate it
    this._nodeClient = new NodeCache();
    console.log(`Caching Client initialized in '${env}' environment`);
  }

  // expose single function to handle the client write irrespective of the underlying connections
  static async set(key, value) {
    if (this._clientMode === "production") {
      await this._redisClient.set(key, value);
    } else {
      this._nodeClient.set(key, value);
    }
  }

  // expose single function to handle the client read irrespective of the underlying connections
  static async get(key) {
    if (this._clientMode === "production") {
      return await this._redisClient.get(key);
    } else {
      return (this._nodeClient.get(key)) || null;
    }
  }

  static async del(key) {
    if (this._clientMode === "production") {
      return await this._redisClient.del(key);
    } else {
      return this._nodeClient.del(key);
    }
  }
}

module.exports = {CacheClient};