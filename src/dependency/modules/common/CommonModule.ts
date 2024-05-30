import { DAL_SYMBOLS } from "../../../infrastructure/db/DAL_SYMBOLS";
import { IOrm } from "../../../infrastructure/db/orm/IOrm";
import { TypeOrm } from "../../../infrastructure/db/orm/TypeOrm";
import { BaseModule } from "../../BaseModule";
import { interfaces } from 'inversify'

export class CommonModule extends BaseModule {

    constructor() {
        super((bind: interfaces.Bind): void => {
            this.init(bind)
        })
    }

    public init(bind: interfaces.Bind): void {
        this.provideORM(bind)
    }

    private provideORM(bind: interfaces.Bind): void {
        bind<IOrm>(DAL_SYMBOLS.ORM).to(TypeOrm)
    }
}