import { Inject } from "@nestjs/common";
import Redis from "ioredis";

export class CacheService {
    
    constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {}

    async set(key: string, value: any, ttl = 60){
        await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async get<T>(key: string):Promise<T|null>{
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async del(key:string){
        await this.redis.del(key);
    }
}