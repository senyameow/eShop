import { interfaces } from "inversify";
import { BaseModule } from "../../base/BaseModule";
import { IUserRepository } from "../../../core/domainServices/User/IUserRepository";
import { UserRepository } from "../../../infrastructure/db/repository/User/UserRepository";
import { DOMAIN_REPOSITORIES_SYMBOLS, DOMAIN_SERVICES_SYMBOLS } from "../../../core/SYMBOLS";
import { IUserService } from "../../../core/applicationServices/User/IUserService";
import { UserService } from "../../../core/applicationServices/User/UserService";


export class UserModule extends BaseModule {

    constructor() {
        super((bind: interfaces.Bind) => {
            this.init(bind)
        })
    }

    public init(bind: interfaces.Bind): void {
        this.provideUserRepository(bind)
        this.provideUserService(bind)
    }

    private provideUserRepository(bind: interfaces.Bind): void {
        bind<IUserRepository>(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY).to(UserRepository)
    }

    private provideUserService(bind: interfaces.Bind): void {
        bind<IUserService>(DOMAIN_SERVICES_SYMBOLS.USER_SERVICE).to(UserService)
    }
}