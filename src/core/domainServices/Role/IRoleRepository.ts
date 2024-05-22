import { Role } from "../../domain/Role/Role";
import { FindRoleByNameRequest } from "./requests/FindRoleByNameRequest";

export interface IRoleRepository {
    findRoleByName(request: FindRoleByNameRequest): Promise<Role>
}