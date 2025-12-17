import { Tag } from './src/modules/items/entities/tag.entities';
import { Listing } from './src/modules/items/entities/listing.entity';
import { Item } from './src/modules/items/entities/item.entity';
import { Comment } from './src/modules/items/entities/comment.entity';
import { ConfigService } from '@nestjs/config';
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();

export default new DataSource({
    type: "mysql",
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'), 
    migrations: ['migrations/**.ts'],
    entities: [Item, Listing, Comment, Tag]   
})