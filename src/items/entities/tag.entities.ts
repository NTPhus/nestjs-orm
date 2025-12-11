import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";
import { CreateTagDto } from "../dto/create-tag.dto";

@Entity()
export class Tag extends AbstractEntity<Tag>{
    @Column()
    content: string;

    constructor(data: CreateTagDto){
        super(data);
        Object.assign(this, data);
    }
}