import { InversifyExpressServer } from 'inversify-express-utils'
import 'reflect-metadata'
import container from './dependency/container'
import { AuthProvider } from './UI/config/app/express/middlewares/AuthProvider'

const server = new InversifyExpressServer(container, null, { rootPath: '/' }, null, AuthProvider)