import { inject, injectable } from "inversify";
import { LoginRequest } from "../../../../../../core/applicationServices/Authentication/requests/LoginRequest";
import { IAuthentication } from "../../../../../common/auth/public/IAuthentication";
import { IAuthenticationService } from "../../../../../../core/applicationServices/Authentication/IAuthenticationService";
import { DOMAIN_SERVICES_SYMBOLS } from "../../../../../../core/SYMBOLS";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { UIError } from "../../../../../common/config/errors/UIError";
import { UI_UserDto } from "../../../../../dto/UI_UserDto";
import { AuthResponse } from "../../../../../common/auth/models/AuthResponse";
import { IJWT } from "../../../../../common/auth/utils/jwt/IJWT";
import { CreateTokenRequest } from "../../../../../common/auth/utils/jwt/requests/CreateRequest";
import { ACCESS_TOKEN_LIFETIME, JWT_SECRET_KEY, REFRESH_TOKEN_LIFETIME } from "../../../../../common/config/errors/constants/const";
import { UI_APP_SYMBOLS } from "../../../../../SYMBOLS";

@injectable()
export class JWTAuth implements IAuthentication {

    constructor(
        @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly authService: IAuthenticationService,
        @inject(UI_APP_SYMBOLS.JWT_UTIL) private readonly jwtService: IJWT
    ) { }

    async authenticate(request: LoginRequest): Promise<AuthResponse> {
        const user = await this.authService.login(request)

        console.log(user)

        if (!user) {
            throw new UIError(
                StatusCodes.UNAUTHORIZED,
                getReasonPhrase(StatusCodes.UNAUTHORIZED),
            )
        }

        const UserDto = new UI_UserDto(user.Contact.email, user.role, user.id)
        // JWT хочет plain object,а не инстанс класса
        const payload = { ...UserDto }

        const accessToken = this.jwtService.createToken(new CreateTokenRequest(payload, JWT_SECRET_KEY, ACCESS_TOKEN_LIFETIME))
        const refreshToken = this.jwtService.createToken(new CreateTokenRequest(payload, JWT_SECRET_KEY, REFRESH_TOKEN_LIFETIME))

        return new AuthResponse(accessToken, refreshToken)
    }
}