import 'reflect-metadata'
import { config } from 'dotenv'

import * as express from 'express'
import { Server as HttpServer, createServer } from 'http'
import { DataSourceOptions } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

process.env.NODE_ENV = 'test'
config()


export class TestFactory {
    private _app: express.Application;
    private _connection: Connection;
    private _server: HttpServer;

    // DB connection options
    private options: DataSourceOptions = {
        type: 'postgres',
        database: new Uint8Array(),
        location: 'database',
        logging: false,
        synchronize: true,
        entities: ['dist/api/components/**/model.js']
    };

    public get app(): supertest.SuperTest<supertest.Test> {
        return supertest(this._app);
    }

    public get connection(): Connection {
        return this._connection;
    }

    public get server(): HttpServer {
        return this._server;
    }

    /**
     * Connect to DB and start server
     */
    public async init(): Promise<void> {
        this._connection = await createConnection(this.options);
        this._app = new Server().app;
        this._server = createServer(this._app).listen(process.env.NODE_PORT);
    }

    /**
     * Close server and DB connection
     */
    public async close(): Promise<void> {
        this._server.close();
        this._connection.close();
    }
}