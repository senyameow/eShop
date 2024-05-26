import { IRepository } from "./IRepository";
import { FindOptionsWhere, Repository as TypeOrmRepo } from 'typeorm'

export abstract class AbstractRepository<Entity> implements IRepository<Entity> {

    protected constructor(protected readonly repository: TypeOrmRepo<Entity>) { }

    public async save(entity: Entity): Promise<Entity> {
        return this.repository.save(entity)
    }

    public async findBy(condition: FindOptionsWhere<Entity>): Promise<Entity[] | undefined> {
        return this.repository.findBy(condition)
    }
    public async findAll(): Promise<Entity[]> {
        return this.repository.find()
    }

}