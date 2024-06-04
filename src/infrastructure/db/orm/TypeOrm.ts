import { injectable } from "inversify";
import { IOrm } from "./IOrm";
import { Connection, TestConnection } from "./Connection";

@injectable()
export class TypeOrm implements IOrm {

    private readonly Connect = process.env.NODE_ENV === 'test' ? TestConnection : Connection

    public async init(): Promise<void> {
        await this.Connect.initialize()
    }
}