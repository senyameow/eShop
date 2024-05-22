import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, interfaces, requestBody, results } from "inversify-express-utils";
import { IAuthenticationService } from "../../../core/applicationServices/Authentication/IAuthenticationService";
import { SignUpRequest } from "../../../core/applicationServices/Authentication/requests/SignUpRequest";
import { SignUpRequestBody } from "./requests/SignUpRequestBody";
import { UI_UserDto } from "../../dto/UI_UserDto";
import StatusCodes from 'http-status-codes'

@controller('/api/auth')
export class AuthenticationController extends BaseHttpController {
    constructor(
        @inject() private readonly authenticationService: IAuthenticationService,

    ) {
        super()
    }

    @httpPost('/register')
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



}