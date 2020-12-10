import UsersRouterRout from "./routes/UsersRouter.rout";
import AseRout from "./routes/Ase.rout";
import App from "./app";
import AseDB from "./dbOps/AseDb";
import ConnectionInUseRout from "./routes/ConnectionInUse.rout";
import RightsTranslationsRout from "./routes/RightsTranslations.rout";
import UserRightsRout from "./routes/UserRights.rout";
import AuthenticateRout from "./routes/authenticate.rout";

class Server {
    public usersRouter: UsersRouterRout;
    public aseRouter: AseRout;
    public connectionInUse: ConnectionInUseRout;
    public rightsTranslations: RightsTranslationsRout;
    public userRights: UserRightsRout;
    app;

    constructor() {
        let aseDb = new AseDB();
        this.usersRouter = new UsersRouterRout(aseDb);
        this.aseRouter = new AseRout(aseDb);
        this.connectionInUse = new ConnectionInUseRout(aseDb);
        this.rightsTranslations = new RightsTranslationsRout(aseDb);
        this.userRights = new UserRightsRout(aseDb);
        this.startApp();
    }

    startApp() {
        let routs = [
            this.usersRouter,
            this.aseRouter,
            this.connectionInUse,
            this.rightsTranslations,
            this.userRights
        ];

        this.app = new App(routs, 5000);

        this.app.listen();

    }

}

let server = new Server();

export default Server;
