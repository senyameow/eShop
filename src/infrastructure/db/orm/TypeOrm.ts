import { injectable } from "inversify";
import { IOrm } from "./IOrm";
import { Connection } from "./Connection";

@injectable()
export class TypeOrm implements IOrm {
    public async init(): Promise<void> {
        await Connection.initialize()
    }
}