import 'reflect-metadata'
import { ExpressApp } from './UI/common/config/app/express/ExpressApp'
import { UI_APP_SYMBOLS } from './UI/SYMBOLS'
import { IOrm } from './infrastructure/db/orm/IOrm'
import { DAL_SYMBOLS } from './infrastructure/db/DAL_SYMBOLS'
import { InversifyExpressServer } from 'inversify-express-utils'
import { AppContainer } from './dependency/AppContainer'

(async () => {

    const appContainer = new AppContainer()

    appContainer.init()

    appContainer.get<ExpressApp>(UI_APP_SYMBOLS.EXPRESS_APP).init();

    await appContainer.get<IOrm>(DAL_SYMBOLS.ORM).init()

    appContainer.get<InversifyExpressServer>(UI_APP_SYMBOLS.IVERSIFY_EXPRESS_APP).build().listen(8080)
})();