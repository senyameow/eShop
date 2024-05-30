import { injectable } from 'inversify';
import { Role } from '../../../../core/domain/Role/Role';
import { IRoleRepository } from '../../../../core/domainServices/Role/IRoleRepository';
import { FindRoleByNameRequest } from '../../../../core/domainServices/Role/requests/FindRoleByNameRequest';
import { Role as RoleEntity } from '../../entities/Role'
import { AbstractRepository } from '../common/Repository';
import { EntityNotFoundError } from 'typeorm';
import { BaseError } from '../../../../core/common/errors/BaseError';
import { DALErrors } from '../../../common/errors/DALErrors';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class RoleRepository extends AbstractRepository<RoleEntity> implements IRoleRepository {

    constructor() {
        super(RoleEntity)
    }

    async findRoleByName({ name }: FindRoleByNameRequest): Promise<Role> {
        try {
            const role = await this._repository
                .createQueryBuilder()
                .select('role')
                .from(RoleEntity, 'role')
                .where('role.name = :id', { name })
                .getOne()
            return new Role(role.id.toString(), role.name)
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new BaseError(
                    DALErrors[DALErrors.ROLE_NOT_FOUND],
                    StatusCodes.BAD_REQUEST
                )
            }
        }
    }
}