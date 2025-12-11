import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Item } from "./item.entity";
import { CreateCommentDto } from "../dto/create-comment.dto";

@Entity()
export class Comment extends AbstractEntity<Comment>{
    @Column()
    content: string;

    @ManyToOne(() => Item, (item) => item.comments)
    item: Item;

    constructor(data: Partial<CreateCommentDto>){
        super(data);
        Object.assign(this, data);
    }
}