import { injectable } from "inversify";
import { AuthRequest } from "../../../../../core/applicationServices/Authentication/requests/AuthRequest";
import { IAuthentication } from "../../../../common/auth/IAuthentication";

@injectable()
export class JWTAuth implements IAuthentication {
    async authenticate(request: AuthRequest): Promise<string> {

    }
}