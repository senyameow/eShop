import { DataSource } from "typeorm";
import { Role } from "../entities/Role";
import { User } from "../entities/User";

export const Connection = new DataSource({
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    migrationsRun: false,
    migrations: [`${__dirname}/src/infrastructure/db/migrations/*.ts`],
    host: 'localhost',
    type: 'postgres',
    entities: [User, Role],
    synchronize: true,
})

export const TestConnection = new DataSource({
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: +process.env.TEST_DB_PORT,
    password: process.env.DB_PASSWORD,
    // host: 'host.docker.internal',
    // logging: true,
    migrationsRun: false,
    // entities: [`${__dirname}/src/infrastructure/db/entities/**/*.ts`],
    migrations: [`${__dirname}/src/infrastructure/db/migrations/*.ts`],
    host: 'host.docker.internal',
    type: 'postgres',
    entities: [User, Role],
    synchronize: true,
})