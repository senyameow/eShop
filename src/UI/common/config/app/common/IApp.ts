export interface IApp {
    initBodyParser(): void;
    initSecurity(): void;
    initPlugins(): void;
    initHandlers(): void;
    initLog(): void;
}