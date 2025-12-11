import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Listing } from "./listing.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entities";

@Entity()
export class Item extends AbstractEntity<Item>{
    @Column()
    name: string;

    @Column({default: true})
    public: boolean;

    @OneToOne(() => Listing, {cascade: true})
    @JoinColumn()
    listing: Listing;

    @OneToMany(() => Comment, (comment) => comment.item, {cascade:true})
    comments: Comment[]

    @ManyToMany(() => Tag, {cascade: true})
    @JoinTable()
    tags: Tag[]

    constructor(data: Partial<Item>){
        super(data);
        Object.assign(this, data);
    }
}
