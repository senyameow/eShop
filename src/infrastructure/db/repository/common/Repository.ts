import { IRepository } from "./IRepository";
import { FindOptionsWhere, ObjectType, Repository as TypeOrmRepo } from 'typeorm'
import { Connection } from "../../orm/Connection";
import { injectable, unmanaged } from "inversify";

@injectable()
export abstract class AbstractRepository<Entity> implements IRepository<Entity> {

    protected readonly _repository: TypeOrmRepo<Entity>

    public constructor(
        @unmanaged() protected readonly entity: ObjectType<Entity>,
    ) {
        this._repository = Connection.getRepository(entity)
    }

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