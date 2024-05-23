import { AccessToken } from "./AccessToken";
import { RefreshToken } from "./RefreshToken";

export class AuthResponse {
    constructor(
        public readonly accessToken: string,
        public readonly refreshToken: string
    ) { }
}