import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { NextFunction, Request, Response } from 'express'
import { IUserRepository } from "../../../../../core/domainServices/User/IUserRepository";
import { IJWT } from "../../../../common/auth/utils/jwt/IJWT";
import { UI_APP_SYMBOLS } from "../../../../SYMBOLS";
import { DOMAIN_REPOSITORIES_SYMBOLS, DOMAIN_SERVICES_SYMBOLS } from "../../../../../core/SYMBOLS";
import { JWTPayload } from "../auth/JWTPayload";
import { IUserService } from "../../../../../core/applicationServices/User/IUserService";
import { GetUserByEmailRequest } from "../../../../../core/applicationServices/User/requests/GetUserByEmailRequest";

// AuthProvider интерфейс говорит классу, чтонадо имплементировать getUser и вернуть какой-то Principal в промисе
// при этом getUser это экспресовская мидлвара, поэтому ей место в middlewares в зоне ответственности экспресса (ествественно в слое UI)
@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(UI_APP_SYMBOLS.JWTUtil) private readonly jwt: IJWT

    @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly userService: IUserService;

    public async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<interfaces.Principal> {
        const token = this.jwt.getTokenFromHeaders(req.headers)

        // if (!token) return new Principal -> TODO create new empty Principal 
        // https://www.npmjs.com/package/inversify-express-utils
        const data = this.jwt.decodeToken<JWTPayload>(token)
        // { email: 'senya@mail.ru', role: 'USER', id: 0, iat: 1716562734 }
        // могу засерчить юзера по емайлу -> обращаюсь к юзерРепо
        if (data === null) {
            // handle 
            return undefined
        }
        const { user: userData } = data
        // TS ругается, т.к. не знает ничего про email, для этого я делал дженерик, щас надо дать дженерик, где будет email 
        // а вообще я должен обращаться к app сервису, а не репозиторию.. че я делаю
        try {
            const user = await this.userService.getUserByEmail(new GetUserByEmailRequest(userData.Contact.email))

            if (!user) return undefined

        } catch (error) {
            next(error)
            return undefined // вернуть Principal todo
        }
    }

}