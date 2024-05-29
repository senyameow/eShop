import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { NextFunction, Request, Response } from 'express'
import { IUserRepository } from "../../../../../core/domainServices/User/IUserRepository";
import { IJWT } from "../../../../common/auth/utils/jwt/IJWT";
import { UI_APP_SYMBOLS } from "../../../../SYMBOLS";
import { DOMAIN_REPOSITORIES_SYMBOLS, DOMAIN_SERVICES_SYMBOLS } from "../../../../../core/SYMBOLS";
import { JWTPayload } from "../auth/jwt/JWTPayload";
import { IUserService } from "../../../../../core/applicationServices/User/IUserService";
import { GetUserByEmailRequest } from "../../../../../core/applicationServices/User/requests/GetUserByEmailRequest";
import { Principal } from "../auth/models/Principal";

// AuthProvider интерфейс говорит классу, чтонадо имплементировать getUser и вернуть какой-то Principal в промисе
// при этом getUser это экспресовская мидлвара, поэтому ей место в middlewares в зоне ответственности экспресса (ествественно в слое UI)
@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(UI_APP_SYMBOLS.JWT_UTIL) private readonly jwt: IJWT

    @inject(DOMAIN_SERVICES_SYMBOLS.AUTHENTICATION_SERVICE) private readonly userService: IUserService;

    public async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<interfaces.Principal> {
        const token = this.jwt.getTokenFromHeaders(req.headers)

        // https://www.npmjs.com/package/inversify-express-utils
        const data = this.jwt.decodeToken<JWTPayload>(token)
        // { User, iat: 1716562734 }
        if (data === null) {
            return new Principal(null)
        }
        const { user: userData } = data
        try {
            const user = await this.userService.getUserByEmail(new GetUserByEmailRequest(userData.Contact.email))

            if (!user) return new Principal(null)

            return new Principal(user)

        } catch (error) {
            next(error)
            return new Principal(null)
        }
    }
}