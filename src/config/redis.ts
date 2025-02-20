import Redis from 'ioredis';

const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on("connect", () => console.log("🔌 Connected to Redis"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default redis;