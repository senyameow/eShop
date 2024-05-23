import { CreateTokenRequest } from "./requests/createTokenRequest";

export interface IJWT {
    createToken(request: CreateTokenRequest): string
}