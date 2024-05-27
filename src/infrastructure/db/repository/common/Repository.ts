import { injectable, unmanaged } from "inversify";
import { IRepository } from "./IRepository";
import { FindOptionsWhere, Repository as TypeOrmRepo } from 'typeorm'

@injectable()
export abstract class AbstractRepository<Entity> implements IRepository<Entity> {

    public constructor(@unmanaged() protected readonly _repository: TypeOrmRepo<Entity>) { }

    public async save(entity: Entity): Promise<Entity> {
        return this._repository.save(entity)
    }
    public async findBy(condition: FindOptionsWhere<Entity>): Promise<Entity[] | undefined> {
        return this._repository.findBy(condition)
    }
    public async findAll(): Promise<Entity[]> {
        return this._repository.find()
    }

}