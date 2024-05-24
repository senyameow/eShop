import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { NextFunction, Request, Response } from 'express'
import { IUserRepository } from "../../../core/domainServices/User/IUserRepository";
import { IJWT } from "./utils/jwt/IJWT";
import { UI_APP_SYMBOLS } from "../../SYMBOLS";
import { DOMAIN_REPOSITORIES_SYMBOLS } from "../../../core/SYMBOLS";

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

        const data = this.jwt.decodeToken(token)

        // const user = await this.userRepository.getUserByEmail(token);
        // const principal = new Principal(user);
        // return principal;
    }

}