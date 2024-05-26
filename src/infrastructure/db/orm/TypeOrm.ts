import { injectable } from "inversify";
import { User } from "../entities/User/User";
import { IOrm } from "./IOrm";
import { DataSource } from "typeorm";

@injectable()
export class TypeOrm implements IOrm {
    async init(): Promise<void> {
        const ds = new DataSource({
            username: 'postgres',
            database: 'eshop',
            port: 5432,
            password: '211854Yuki',
            host: 'localhost',
            type: 'postgres',
            entities: [User]
        })
        await ds.initialize()
    }
}