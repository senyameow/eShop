import { inject, injectable } from "inversify";
import { AuthRequest } from "../../../../../core/applicationServices/Authentication/requests/AuthRequest";
import { IAuthentication } from "../../../../common/auth/IAuthentication";
import { IAuthenticationService } from "../../../../../core/applicationServices/Authentication/IAuthenticationService";
import { DOMAIN_SERVICES_SYMBOLS } from "../../../../../core/SYMBOLS";
import { SignUpRequest } from "../../../../../core/applicationServices/Authentication/requests/SignUpRequest";

@injectable()
export class JWTAuth implements IAuthentication {

    constructor(
        @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly authService: IAuthenticationService
    ) { }

    async register(request: SignUpRequest): Promise<string> {

    }
}