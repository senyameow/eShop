import { AccessToken } from "./AccessToken";
import { RefreshToken } from "./RefreshToken";

export class AuthResponse {
    constructor(
        public readonly accessToken: AccessToken,
        public readonly refreshToken: RefreshToken
    ) { }
}