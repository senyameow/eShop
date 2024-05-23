import { Secret } from 'jsonwebtoken'
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from '../../../../config/errors/constants/const';

enum LIFETIME {
    ACCESS = ACCESS_TOKEN_LIFETIME as number,
    REFRESH = REFRESH_TOKEN_LIFETIME as number
}

export class CreateTokenRequest {
    constructor(
        public readonly payload: Object | string,
        public readonly secret: Secret,
        public readonly expiresIn: LIFETIME
    ) { }
}