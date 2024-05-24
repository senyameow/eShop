import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { NextFunction, Request, Response } from 'express'
import { IUserRepository } from "../../../../../core/domainServices/User/IUserRepository";
import { IJWT } from "../../../../common/auth/utils/jwt/IJWT";
import { UI_APP_SYMBOLS } from "../../../../SYMBOLS";
import { DOMAIN_REPOSITORIES_SYMBOLS } from "../../../../../core/SYMBOLS";
import { JWTPayload } from "../auth/JWTPayload";
import { GetUserByEmailRequest } from "../../../../../core/domainServices/User/requests/GetUserByEmailRequest";

// AuthProvider интерфейс говорит классу, чтонадо имплементировать getUser и вернуть какой-то Principal в промисе
// при этом getUser это экспресовская мидлвара, поэтому ей место в middlewares в зоне ответственности экспресса (ествественно в слое UI)
@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(UI_APP_SYMBOLS.JWTUtil) private readonly jwt: IJWT

    @inject(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY) private readonly userRepository: IUserRepository;

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

        // TS ругается, т.к. не знает ничего про email, для этого я делал дженерик, щас надо дать дженерик, где будет email 
        const user = await this.userRepository.getUserByEmail(new GetUserByEmailRequest(data.user.Contact.email))
        // не нравятся мне эти точки, конечно.. но пока забью. как говорится TODO =) 



        // const user = await this.userRepository.getUserByEmail(token);
        // const principal = new Principal(user);
        // return principal;
    }

}