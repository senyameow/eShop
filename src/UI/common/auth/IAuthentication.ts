// наше приложение хочет аутентифицировать людей через данный интерфейс
// внешний мир должен предоставить метод(ы)

import { AuthRequest } from "../../../core/applicationServices/Authentication/requests/AuthRequest";
import { SignUpRequest } from "../../../core/applicationServices/Authentication/requests/SignUpRequest";

export interface IAuthentication {
    authenticate(request: AuthRequest): Promise<string> // возвращает jwt access токен
    register(request: SignUpRequest): Promise<string>
}