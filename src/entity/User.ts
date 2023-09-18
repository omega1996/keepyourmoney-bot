import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    firstName: string

    @Column('text')
    lastName: string

    @Column('text')
    username: string

    @Column('integer')
    tg_id: number

    @Column('text',{default: 'en'})
    locale: string

}
