
// ормки должны реализовывать подключение (init)
export interface IOrm {
    init(): Promise<void>;
}