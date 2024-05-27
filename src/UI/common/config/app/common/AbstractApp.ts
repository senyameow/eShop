export abstract class AbstractApp<App> {

    constructor(protected readonly app: App) { }

    abstract init(): void
}