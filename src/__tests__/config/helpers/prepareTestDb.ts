import { DataSource } from "typeorm"
import { Role } from "../../../infrastructure/db/entities/Role"


export const prepareTestDb = async (db: DataSource) => {
    await db.synchronize(true)

    const res = await db.createQueryBuilder().insert().into(Role).values([
        {
            name: 'USER'
        },
        {
            name: 'ADMIN'
        },
    ]).execute()

}