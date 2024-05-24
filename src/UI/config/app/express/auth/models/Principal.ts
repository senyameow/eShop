import { interfaces } from "inversify-express-utils";
import { User } from "../../../../../../core/domain/User/User";
import { USER_ROLE } from "../../../../../../core/domain/User/UserRole";

export class Principal implements interfaces.Principal {
    constructor(public details: User | null) { this.details = details }

    public isAuthenticated(): Promise<boolean> {
        return Promise.resolve(!!this.details) // if null -> false -> not authenticated
    }
    isInRole(role: USER_ROLE): Promise<boolean> {
        return Promise.resolve(!!(role === this.details.role))
    }
    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true) // пока не знаю как буду использовать, но имплементировать надо (скорее всего поменяется)
    }
}