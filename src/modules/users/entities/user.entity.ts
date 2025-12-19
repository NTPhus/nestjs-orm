import { AbstractEntity } from "../../../database/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Orders } from "./orders.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User extends AbstractEntity<User>{    
    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column()
    @Exclude()
    password:string;

    @OneToMany(()=> Orders, orders => orders.user)
    orders: Orders[];

    constructor(data: Partial<User>){
        super(data);
        Object.assign(this, data);
    }
}