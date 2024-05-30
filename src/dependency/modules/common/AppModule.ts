import { interfaces } from "inversify";
import { BaseModule } from "../../BaseModule";
import * as express from 'express'
import { UI_APP_SYMBOLS } from "../../../UI/SYMBOLS";
import { IApp } from "../../../UI/common/config/app/common/IApp";
import { ExpressApp } from "../../../UI/common/config/app/express/ExpressApp";

import '../../../UI/controllers/Authentication/AuthenticationsController'

export class AppModule extends BaseModule {

    constructor() {
        super((bind: interfaces.Bind) => {
            this.init(bind)
        })
    }

    public init(bind: interfaces.Bind): void {
        // provide express app
        this.provideExpress(bind)
        this.provideExpressApp(bind)

    }

    private provideExpress(bind: interfaces.Bind): void {
        bind<express.Application>(UI_APP_SYMBOLS.EXPRESS).toConstantValue(express())
    }

    private provideExpressApp(bind: interfaces.Bind): void {
        bind<IApp>(UI_APP_SYMBOLS.EXPRESS_APP).to(ExpressApp)
    }

}