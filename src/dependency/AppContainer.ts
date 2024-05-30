import { InversifyExpressServer } from "inversify-express-utils";
import { BaseContainer } from "./base/BaseContainer";
import { AuthenticationModule } from "./modules/Authentication/AuthenticationModule";
import { RoleModule } from "./modules/Role/RoleModule";
import { UserModule } from "./modules/User/UserModule";
import { AppModule } from "./modules/common/AppModule";
import { CommonModule } from "./modules/common/CommonModule";
import { UI_APP_SYMBOLS } from "../UI/SYMBOLS";
import { ExpressApp } from "../UI/common/config/app/express/ExpressApp";
import { AuthProvider } from "../UI/config/app/express/middlewares/AuthProvider";
import { errorHandler } from "../UI/config/app/express/errors/handlers/errorHandler";

export class AppContainer extends BaseContainer {

    constructor() {
        super({
            // всегда один и тот же экземпляр объекта.
            defaultScope: 'Singleton',
            // не будет чекать injectable в моих injectable классах, которые наследуют от 3rdparty классов.
            skipBaseClassChecks: true,
        })
    }

    init(): void {
        // app
        this.provideAppModule()
        this.provideCommonModule()

        // modules
        this.provideAuthenticationModule()
        this.provideRoleModule()
        this.provideUserModule()

        // inversify-express-app
        this.provideInversifyExpressApp()
    }

    private provideCommonModule(): void {
        this.load(new CommonModule())
    }

    private provideAppModule(): void {
        this.load(new AppModule())
    }

    private provideAuthenticationModule(): void {
        this.load(new AuthenticationModule())
    }

    private provideUserModule(): void {
        this.load(new UserModule())
    }

    private provideRoleModule(): void {
        this.load(new RoleModule())
    }

    private provideInversifyExpressApp(): void {
        this.bind<InversifyExpressServer>(UI_APP_SYMBOLS.IVERSIFY_EXPRESS_APP).toConstantValue(
            new InversifyExpressServer(
                this,
                null,
                { rootPath: '/' },
                this.get<ExpressApp>(UI_APP_SYMBOLS.EXPRESS_APP).appValue,
                AuthProvider
            ).setErrorConfig(errorHandler)
        )
    }
}