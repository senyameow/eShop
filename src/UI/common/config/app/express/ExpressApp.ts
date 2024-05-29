import { inject, injectable } from "inversify";
import { AbstractApp } from "../common/AbstractApp";
import * as express from 'express'
import * as cors from 'cors'
import helmet from 'helmet'
import { IApp } from "../common/IApp";
import { UI_APP_SYMBOLS } from "../../../../SYMBOLS";

@injectable()
export class ExpressApp extends AbstractApp<Express.Application> implements IApp {

    constructor(@inject(UI_APP_SYMBOLS.EXPRESS) protected readonly app: express.Application) {
        super(app)
    }

    init(): void {
        this.initBodyParser()
        this.initSecurity()
        this.initPlugins()
    }

    initBodyParser(): void {
        this.app.use(express.json())
    }

    initSecurity(): void {
        this.app.use(helmet())
    }

    initPlugins(): void {
        this.app.use(cors())
    }

    initHandlers(): void {
        throw new Error("Method not implemented.");
    }

    initLog(): void {
        throw new Error("Method not implemented.");
    }

    public get appValue(): express.Application {
        return this.app
    }

}