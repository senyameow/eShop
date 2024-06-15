import { inject } from "inversify";
import { BaseHttpController, controller, cookies, httpGet, httpPost, interfaces, requestBody, results } from "inversify-express-utils";
import { IAuthenticationService } from "../../../core/applicationServices/Authentication/IAuthenticationService";
import { SignUpRequest } from "../../../core/applicationServices/Authentication/requests/SignUpRequest";
import { SignUpRequestBody } from "./requests/SignUpRequestBody";
import { UI_UserDto } from "../../dto/UI_UserDto";
import StatusCodes from 'http-status-codes'
import { LoginRequestBody } from "./requests/LoginRequestBody";
import { DOMAIN_SERVICES_SYMBOLS } from "../../../core/SYMBOLS";
import { LoginRequest } from "../../../core/applicationServices/Authentication/requests/LoginRequest";
import { IAuthentication } from "../../common/auth/public/IAuthentication";
import { UI_APP_SYMBOLS } from "../../SYMBOLS";
import { RefreshTokensRequestBody } from "./requests/RefreshTokensRequestBody";

@controller('/api/auth')

export class AuthenticationController extends BaseHttpController {
    constructor(
        @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly authenticationService: IAuthenticationService,

        @inject(UI_APP_SYMBOLS.JWT) private readonly jwt: IAuthentication
    ) {
        super()
    }

    @httpPost('/signup')
    public async register(
        @requestBody()
        { email, password }: SignUpRequestBody
    ): Promise<results.JsonResult> {

        const { Contact, role, id } = await this.authenticationService.signUp(new SignUpRequest(email, password))

        const userDto = new UI_UserDto(Contact.email, role, id)

        return this.json(userDto, StatusCodes.OK)
    }

    @httpGet('/login')
    public async login(
        @requestBody()
        { email, password, fingerprint }: LoginRequestBody
    ): Promise<results.JsonResult> {
        const tokens = await this.jwt.authenticate(new LoginRequest(email, password))

        return this.json(tokens, StatusCodes.OK)
    }

    @httpGet('/refresh-tokens')
    public async refresh(
        @requestBody()
        { }: RefreshTokensRequestBody
    ) {

    }

}