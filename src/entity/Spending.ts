
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { User } from './User'

@Entity()
export class Spending {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', {nullable: true, default: null})
    category: string

    @Column('text', {nullable: true, default: null})
    currency: string

    @Column('float', {nullable: true, default: null})
    value: number

    @ManyToOne(() => User, (user) => user.spendings)
    user: User

}