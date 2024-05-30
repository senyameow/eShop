import { Container } from "inversify"

// The InversifyJS container is where dependencies are first configured through bind and, possibly later, reconfigured and removed
// https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md
export abstract class BaseContainer extends Container {
    abstract init(): void;
}