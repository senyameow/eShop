import { injectable } from 'inversify';
import { Role } from '../../../../core/domain/Role/Role';
import { IRoleRepository } from '../../../../core/domainServices/Role/IRoleRepository';
import { FindRoleByNameRequest } from '../../../../core/domainServices/Role/requests/FindRoleByNameRequest';
import { Role as RoleEntity } from '../../entities/Role'
import { AbstractRepository } from '../common/Repository';
import { EntityNotFoundError } from 'typeorm';
import { BaseError } from '../../../../core/common/errors/BaseError';
import { DALErrors } from '../../../common/errors/DALErrors';

@injectable()
export class RoleRepository extends AbstractRepository<RoleEntity> implements IRoleRepository {
    async findRoleByName({ name }: FindRoleByNameRequest): Promise<Role> {
        try {
            const role = await this._repository
                .createQueryBuilder()
                .where('role.name = :name', { name })
                .getOneOrFail()

            return new Role(role.id.toString(), role.name)
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new BaseError(
                    DALErrors[DALErrors.ROLE_NOT_FOUND]
                )
            }
        }
    }
}