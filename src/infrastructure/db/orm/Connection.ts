import { DataSource } from "typeorm";
import { Role } from "../entities/Role";
import { User } from "../entities/User";

export const Connection = new DataSource({
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    // host: 'host.docker.internal',
    host: 'localhost',
    type: 'postgres',
    entities: [User, Role],
    synchronize: false,
})