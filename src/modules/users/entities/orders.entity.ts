import { AbstractEntity } from "../../../database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Orders extends AbstractEntity<Orders>{

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({name: "user_id"})
    userId: number;
    
    @Column()
    total_amount: number;

    @Column({default: "PENDING" })
    status: string;

    constructor(data: Partial<Orders>){
        super(data);
        Object.assign(this, data);
    }
}