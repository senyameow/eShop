import { inject, injectable } from "inversify";
import { LoginRequest } from "../../../../../core/applicationServices/Authentication/requests/LoginRequest";
import { IAuthentication } from "../../../../common/auth/public/IAuthentication";
import { IAuthenticationService } from "../../../../../core/applicationServices/Authentication/IAuthenticationService";
import { DOMAIN_SERVICES_SYMBOLS } from "../../../../../core/SYMBOLS";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { UIError } from "../../../../common/config/errors/UIError";
import { UI_UserDto } from "../../../../dto/UI_UserDto";
import { AuthResponse } from "../../../../common/auth/models/AuthResponse";

@injectable()
export class JWTAuth implements IAuthentication {

    constructor(
        @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly authService: IAuthenticationService
    ) { }

    async authenticate(request: LoginRequest): Promise<AuthResponse> {
        const user = await this.authService.login(request)

        if (!user) {
            throw new UIError(
                StatusCodes.UNAUTHORIZED,
                getReasonPhrase(StatusCodes.UNAUTHORIZED)
            )
        }

        const UserDto = new UI_UserDto(user.Contact.email, user.role, user.id)

        return
    }
}