import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Spending } from "./Spending"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', {nullable: true, default: null})
    firstName: string

    @Column('text', {nullable: true, default: null})
    lastName: string

    @Column('text', {nullable: true, default: null})
    username: string

    @Column('integer')
    tg_id: number

    @Column('text',{default: 'en'})
    locale: string

    @OneToMany(() => Spending, (spending) => spending.user, {nullable: true}) // note: we will create author property in the Photo class below
    spendings: Spending[]
}

