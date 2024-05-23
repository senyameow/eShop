import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import * as express from 'express'
import { IUserRepository } from "../../../core/domainServices/User/IUserRepository";
import { IJWT } from "./utils/jwt/IJWT";
import { UI_APP_SYMBOLS } from "../../SYMBOLS";

const authService = inject("AuthService");

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(UI_APP_SYMBOLS.JWTUtil) private readonly jwt: IJWT

    @authService private readonly userRepository: IUserRepository;

    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = this.jwt.getTokenFromHeaders(req.headers)
        const user = await this.userRepository.getUserByEmail(token);
        const principal = new Principal(user);
        return principal;
    }

}