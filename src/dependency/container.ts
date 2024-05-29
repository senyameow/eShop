import { Container } from 'inversify'
import { DOMAIN_REPOSITORIES_SYMBOLS, DOMAIN_SERVICES_SYMBOLS } from '../core/SYMBOLS'
import { IUserRepository } from '../core/domainServices/User/IUserRepository'
import { IRoleRepository } from '../core/domainServices/Role/IRoleRepository'
import { AuthenticationService } from '../core/applicationServices/Authentication/AuthenticationService'
import { IAuthenticationService } from '../core/applicationServices/Authentication/IAuthenticationService'
import { UI_APP_SYMBOLS } from '../UI/SYMBOLS'
import { JWT } from '../UI/common/auth/utils/jwt/JWT'
import { UserRepository } from '../infrastructure/db/repository/User/UserRepository'
import { RoleRepository } from '../infrastructure/db/repository/Role/RoleRepository'
import { IJWT } from '../UI/common/auth/utils/jwt/IJWT'
import * as express from 'express'
import { ExpressApp } from '../UI/common/config/app/express/ExpressApp'
import { IApp } from '../UI/common/config/app/common/IApp'
import { InversifyExpressServer } from 'inversify-express-utils'
import { AuthProvider } from '../UI/config/app/express/middlewares/AuthProvider'
import { errorHandler } from '../UI/config/app/express/errors/handlers/errorHandler'
import { TypeOrm } from '../infrastructure/db/orm/TypeOrm'
import { IOrm } from '../infrastructure/db/orm/IOrm'
import { DAL_SYMBOLS } from '../infrastructure/db/DAL_SYMBOLS'

import '../UI/controllers/Authentication/AuthenticationsController' // https://github.com/inversify/inversify-express-utils?tab=readme-ov-file#important-information-about-the-controller-decorator
import { JWTAuth } from '../UI/config/app/express/auth/jwt/JWTAuth'
import { IAuthentication } from '../UI/common/auth/public/IAuthentication'
import { Repository } from 'typeorm'
import { AbstractRepository } from '../infrastructure/db/repository/common/Repository'

const container = new Container()


// not ready implementation (repositories):
container.bind(DAL_SYMBOLS.TYPE_ORM_REPO).toConstantValue(Repository)
container.bind<IUserRepository>(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY).to(UserRepository)
container.bind<IRoleRepository>(DOMAIN_REPOSITORIES_SYMBOLS.ROLE_REPOSITORY).to(RoleRepository)

// domain services
container.bind<IAuthenticationService>(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE).to(AuthenticationService)

// ui / utils / другая фигня
container.bind<IJWT>(UI_APP_SYMBOLS.JWT_UTIL).to(JWT)
container.bind<IAuthentication>(UI_APP_SYMBOLS.JWT).to(JWTAuth)
container.bind<express.Application>(UI_APP_SYMBOLS.EXPRESS).toConstantValue(express())
container.bind<IApp>(UI_APP_SYMBOLS.EXPRESS_APP).to(ExpressApp)
container.bind<InversifyExpressServer>(UI_APP_SYMBOLS.IVERSIFY_EXPRESS_APP).toConstantValue(
    new InversifyExpressServer(
        container,
        null,
        { rootPath: '/' },
        container.get<ExpressApp>(UI_APP_SYMBOLS.EXPRESS_APP).appValue,
        AuthProvider
    ).setErrorConfig(errorHandler) // эта мидлвара будет в самом конце (как завещал экспрес)
)
container.bind<IOrm>(DAL_SYMBOLS.ORM).to(TypeOrm)



export default container