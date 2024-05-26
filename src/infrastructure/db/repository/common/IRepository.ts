import { FindOptionsWhere } from "typeorm"

export interface IRepository<Entity> {
    save(entity: Entity): Promise<Entity> // сохраняет переданную сущность в БД
    findBy(condition: FindOptionsWhere<Entity>): Promise<Entity[] | undefined> // находим по ключу из сущности
    findAll(): Promise<Entity[]>
}