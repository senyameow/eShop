
import { interfaces } from "inversify";
import { BaseModule } from "../../base/BaseModule";
import { DOMAIN_REPOSITORIES_SYMBOLS, DOMAIN_SERVICES_SYMBOLS } from "../../../core/SYMBOLS";
import { IRoleRepository } from "../../../core/domainServices/Role/IRoleRepository";
import { RoleRepository } from "../../../infrastructure/db/repository/Role/RoleRepository";

export class RoleModule extends BaseModule {

    constructor() {
        super((bind: interfaces.Bind) => {
            this.init(bind)
        })
    }

    public init(bind: interfaces.Bind): void {
        this.provideRoleRepository(bind)
    }

    private provideRoleRepository(bind: interfaces.Bind): void {
        bind<IRoleRepository>(DOMAIN_REPOSITORIES_SYMBOLS.ROLE_REPOSITORY).to(RoleRepository)
    }
}