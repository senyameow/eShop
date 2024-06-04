import { IRepository } from "./IRepository";
import { DataSource, FindOptionsWhere, ObjectType, Repository as TypeOrmRepo } from 'typeorm'
import { Connection as DevConnection, TestConnection } from "../../orm/Connection";
import { inject, injectable, unmanaged } from "inversify";

@injectable()
export abstract class AbstractRepository<Entity> implements IRepository<Entity> {

    protected readonly _repository: TypeOrmRepo<Entity>

    private readonly Connect: DataSource = process.env.NODE_ENV === 'test' ? TestConnection : DevConnection

    public constructor(
        @unmanaged() protected readonly entity: ObjectType<Entity>,
    ) {
        this._repository = this.Connect.getRepository(entity)
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