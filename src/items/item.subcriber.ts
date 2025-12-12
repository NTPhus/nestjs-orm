import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Item } from "./entities/item.entity";
import { Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

@EventSubscriber()
export class ItemsSubcriber implements EntitySubscriberInterface<Item>{
    private readonly logger = new Logger(ItemsSubcriber.name);

    constructor(dataSource: DataSource){
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Item;
    }

    beforeInsert(event: InsertEvent<Item>): Promise<any> | void {
        this.logger.log('beforeInsert', JSON.stringify(event.entity));
    }

    afterInsert(event: InsertEvent<Item>): Promise<any> | void {
        this.logger.log('afterInsert', JSON.stringify(event.entity));
    }
}