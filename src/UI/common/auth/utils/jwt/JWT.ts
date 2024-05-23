import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken'
import { IJWT } from './IJWT';
import { CreateTokenRequest } from './requests/createTokenRequest';
import { JWT_SECRET_KEY } from '../../../config/errors/constants/const';
import { IncomingHttpHeaders } from 'http';

@injectable()
export class JWT implements IJWT {
    // from https://stackoverflow.com/questions/61802832/regex-to-match-jwt
    private readonly matcher = /([\w-]+)\.[\w-]+\.([\w-]+)+$/;


    createToken({ payload, secret, expiresIn }: CreateTokenRequest): string {
        return jwt.sign(payload, secret, { expiresIn })
    }

    decodeToken(token: string): jwt.JwtPayload | null {
        try {
            jwt.verify(token, JWT_SECRET_KEY)
        } catch (error) {
            return null
        }
    }

    getTokenFromHeaders(headers: IncomingHttpHeaders): string | null {
        const authHeader = headers.authorization
        if (!authHeader) {
            return null;
        }
        const matches = authHeader.match(this.matcher);

        return matches && matches[0]
    }
}