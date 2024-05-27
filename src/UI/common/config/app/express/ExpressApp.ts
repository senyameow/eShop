import { inject, injectable } from "inversify";
import { AbstractApp } from "../common/AbstractApp";
import * as express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { IApp } from "../common/IApp";

@injectable()
export class ExpressApp extends AbstractApp<Express.Application> implements IApp {

    constructor(@inject('') protected readonly app: express.Application) {
        super(app)
    }

    init(): void {
        this.initBodyParser()
        this.initSecurity()
        this.initPlugins()
    }

    public initBodyParser(): void {
        this.app.use(express.json())
    }

    public initSecurity(): void {
        this.app.use(helmet())
    }

    public initPlugins(): void {
        this.app.use(cors())
    }

    public initHandlers(): void {
        throw new Error("Method not implemented.");
    }

    public initLog(): void {
        throw new Error("Method not implemented.");
    }

}