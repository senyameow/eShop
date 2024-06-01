import { DataSource } from "typeorm";
import { Role } from "../entities/Role";
import { User } from "../entities/User";

import { config } from 'dotenv'
config()

export const Connection = new DataSource({
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.NODE_ENV === 'test' ? +process.env.TEST_DB_PORT : +process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    // host: 'host.docker.internal',
    // logging: true,
    migrationsRun: false,
    // entities: [`${__dirname}/src/infrastructure/db/entities/**/*.ts`],
    migrations: [`${__dirname}/src/infrastructure/db/migrations/*.ts`],
    host: process.env.NODE_ENV === 'test' ? process.env.DB_HOST : 'localhost',
    type: 'postgres',
    entities: [User, Role],
    synchronize: false,
})