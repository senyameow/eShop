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

@controller('/api/auth')
export class AuthenticationController extends BaseHttpController {
    constructor(
        @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly authenticationService: IAuthenticationService,
        @inject(UI_APP_SYMBOLS.JWTUtil) private readonly jwt: IAuthentication
    ) {
        super()
    }

    @httpPost('/signup')
    // контроллер получает действие на регистрацию пользователя в системе и дергает нужные сервисы
    // контроллер должен быть МАКСИМАЛЬНО тонким
    public async register(
        @requestBody()
        { email, password }: SignUpRequestBody
    ): Promise<results.JsonResult> {
        // дернули auth сервис
        const { Contact, role, id } = await this.authenticationService.signUp(new SignUpRequest(email, password))
        // мапнули во что-то, что мы хотим отдать клиенту
        const userDto = new UI_UserDto(Contact.email, role, id)
        // вернули json'ку с кодом 200
        return this.json(userDto, StatusCodes.OK)
    }

    @httpGet('/login')
    public async login(
        @requestBody()
        { email, password }: LoginRequestBody
    ): Promise<results.JsonResult> {
        const tokens = await this.jwt.authenticate(new LoginRequest(email, password))
        return this.json(tokens, StatusCodes.OK)
    }

}