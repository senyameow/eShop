import { injectable } from "inversify";
import { RefreshSession } from "../../entities/RefreshSession";
import { AbstractRepository } from "../common/Repository";


@injectable()
export class RefreshSessionRepository extends AbstractRepository<RefreshSession> implements IRefreshSessionRepository {

    constructor() {
        super(RefreshSession)
    }

    async addSession() {

    }
}