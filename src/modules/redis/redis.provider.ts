import Redis from "ioredis";

export const redisProvider = {
    provide: "REDIS_CLIENT",
    useFactory: () => {
        return new Redis({
            host: "localhost",
            port: 6379
        })
    }
}