import { IncomingHttpHeaders } from "http";
import { CreateTokenRequest } from "./requests/CreateRequest";

export interface IJWT {
    createToken(request: CreateTokenRequest): string;
    decodeToken<Result extends Object | string | null>(token: string): Result;
    getTokenFromHeaders(headers: IncomingHttpHeaders): string | null;
} 