// наше приложение хочет аутентифицировать людей через данный интерфейс
// внешний мир должен предоставить метод(ы)

import { LoginRequest } from "../../../../core/applicationServices/Authentication/requests/LoginRequest";
import { AuthResponse } from "../models/AuthResponse";

export interface IAuthentication {
    authenticate(request: LoginRequest): Promise<AuthResponse> // возвращает jwt access токен
}