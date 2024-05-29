import { DataSource } from "typeorm";
import { Role } from "../entities/Role";
import { User } from "../entities/User";

export const Connection = new DataSource({
    username: 'postgres',
    database: 'eshop',
    port: 5432,
    password: '211854Yuki',
    host: 'localhost',
    type: 'postgres',
    entities: [User, Role],
    synchronize: true,
})