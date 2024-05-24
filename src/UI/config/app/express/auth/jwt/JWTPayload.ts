import { User } from "../../../../../../core/domain/User/User";

export interface JWTPayload {
    user: User
}