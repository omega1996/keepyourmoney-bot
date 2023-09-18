import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}
