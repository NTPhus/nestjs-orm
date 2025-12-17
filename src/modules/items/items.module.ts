import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entities';
import { ItemsSubcriber } from './item.subcriber';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing, Comment, Tag])],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsSubcriber],
})
export class ItemsModule {}