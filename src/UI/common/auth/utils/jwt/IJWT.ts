import { IncomingHttpHeaders } from "http";
import * as jwt from 'jsonwebtoken';
import { CreateTokenRequest } from "./requests/createTokenRequest";

export interface IJWT {
    createToken(request: CreateTokenRequest): string;
    decodeToken(token: string): jwt.JwtPayload | null;
    getTokenFromHeaders(headers: IncomingHttpHeaders): string | null
} 