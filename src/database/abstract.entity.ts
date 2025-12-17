import { PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractEntity<T> {
    @PrimaryGeneratedColumn()
    id: number;

    constructor(entity: Partial<T>) {
        if (entity) Object.assign(this, entity);
    }
}
