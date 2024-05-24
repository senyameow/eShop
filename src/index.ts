import { InversifyExpressServer } from 'inversify-express-utils'
import 'reflect-metadata'
import container from './dependency/container'

const server = new InversifyExpressServer(container, null, { rootPath: '/' },)