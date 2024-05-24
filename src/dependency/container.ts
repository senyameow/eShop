import { Container } from 'inversify'
import { DOMAIN_REPOSITORIES_SYMBOLS, DOMAIN_SERVICES_SYMBOLS } from '../core/SYMBOLS'
import { IUserRepository } from '../core/domainServices/User/IUserRepository'
import { IRoleRepository } from '../core/domainServices/Role/IRoleRepository'
import { AuthenticationService } from '../core/applicationServices/Authentication/AuthenticationService'
import { IAuthenticationService } from '../core/applicationServices/Authentication/IAuthenticationService'
import { UI_APP_SYMBOLS } from '../UI/SYMBOLS'
import { JWT } from '../UI/common/auth/utils/jwt/JWT'


const container = new Container()

// not ready implementation (repositories):
// container.bind<IUserRepository>(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY).to()
// container.bind<IRoleRepository>(DOMAIN_REPOSITORIES_SYMBOLS.ROLE_REPOSITORY).to()

// domain services
container.bind<IAuthenticationService>(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE).to(AuthenticationService)

// ui / utils / другая фигня
container.bind(UI_APP_SYMBOLS.JWTUtil).to(JWT)