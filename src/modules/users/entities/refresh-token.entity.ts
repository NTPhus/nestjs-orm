import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, JoinColumn } from "typeorm";
import { OneToOne } from "typeorm/browser";
import { User } from "./user.entity";

@Entity()
export class RefreshToken extends AbstractEntity<RefreshToken>{
    @Column()
    token: string;

    @Column()
    userId: number;

    @Column()
    expiredAt: Date;

    constructor(data: Partial<RefreshToken>){
        super(data);
        Object.assign(this, data);
    }
}