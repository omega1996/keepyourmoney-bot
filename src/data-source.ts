import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Spending } from "./entity/Spending"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "mydb.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Spending],
    migrations: [],
    subscribers: [],
})
