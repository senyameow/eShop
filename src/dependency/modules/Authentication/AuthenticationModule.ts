import { interfaces } from "inversify";
import { BaseModule } from "../../BaseModule";
import { IAuthenticationService } from "../../../core/applicationServices/Authentication/IAuthenticationService";
import { AuthenticationService } from "../../../core/applicationServices/Authentication/AuthenticationService";
import { DOMAIN_SERVICES_SYMBOLS } from "../../../core/SYMBOLS";
import { IJWT } from "../../../UI/common/auth/utils/jwt/IJWT";
import { UI_APP_SYMBOLS } from "../../../UI/SYMBOLS";
import { JWT } from "../../../UI/common/auth/utils/jwt/JWT";
import { JWTAuth } from "../../../UI/config/app/express/auth/jwt/JWTAuth";
import { IAuthentication } from "../../../UI/common/auth/public/IAuthentication";

export class AuthenticationModule extends BaseModule {

    constructor() {
        super((bind: interfaces.Bind) => {
            this.init(bind)
        })
    }

    public init(bind: interfaces.Bind): void {
        this.provideJwtUtil(bind)
        this.provideJwtAuth(bind)
        this.provideAuthService(bind)
    }

    private provideAuthService(bind: interfaces.Bind): void {
        bind<IAuthenticationService>(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE).to(AuthenticationService)
    }

    private provideJwtUtil(bind: interfaces.Bind): void {
        bind<IJWT>(UI_APP_SYMBOLS.JWT_UTIL).to(JWT)
    }

    private provideJwtAuth(bind: interfaces.Bind): void {
        bind<IAuthentication>(UI_APP_SYMBOLS.JWT).to(JWTAuth)
    }

}