import { Application } from "express";
import { AppContainer } from "../../../dependency/AppContainer";
import { UI_APP_SYMBOLS } from "../../../UI/SYMBOLS";
import { ExpressApp } from "../../../UI/common/config/app/express/ExpressApp";
import { InversifyExpressServer } from "inversify-express-utils";


export const getTestApp = async (): Promise<Application> => {

    const appContainer = new AppContainer()

    appContainer.init()

    // appContainer.rebind('Connection').to()

    appContainer.get<ExpressApp>(UI_APP_SYMBOLS.EXPRESS_APP).init()
    return appContainer.get<InversifyExpressServer>(UI_APP_SYMBOLS.IVERSIFY_EXPRESS_APP).build()
}