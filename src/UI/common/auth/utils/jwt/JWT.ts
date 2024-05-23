import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken'
import { IJWT } from './IJWT';
import { CreateTokenRequest } from './requests/createTokenRequest';

@injectable()
export class JWT implements IJWT {
    private readonly key = 'Bearer'
    private readonly header = 'Authorization'
    // from https://stackoverflow.com/questions/61802832/regex-to-match-jwt
    private readonly matcher = /^[\w-]+\.[\w-]+\.[\w-]+$/;


    createToken({ payload, secret, expiresIn }: CreateTokenRequest): string {

        return jwt.sign(payload, secret, { expiresIn })
    }
}
