import UsersRouterRout from "./routes/UsersRouter.rout";
import AseRout from "./routes/Ase.rout";
import ConnectionInUseRout from "./routes/ConnectionInUse.rout";
import RightsTranslationsRout from "./routes/RightsTranslations.rout";
import UserRightsRout from "./routes/UserRights.rout";
import AseDB from "./dbOps/AseDb";
import express from "express";
import {AUTH_COOKIE_TOKEN_NAME, DEFAULT_SECONDS_IN_SESSION, EXPIRATION_KEY} from "../shared/api.constants";
import moment from "moment";
import * as jwt from "jsonwebtoken";
import {generateAuthToken, JWT_SECRET} from "./constants";
import AuthenticateRout from "./routes/Authenticate.rout";


class RoutesLoader {
    public usersRouter: UsersRouterRout;
    public aseRouter: AseRout;
    public connectionInUse: ConnectionInUseRout;
    public rightsTranslations: RightsTranslationsRout;
    public userRights: UserRightsRout;
    public app: express.Application;
    public authenticate: AuthenticateRout;

    constructor(app: express.Application) {
        this.app = app;
        let aseDb = new AseDB();
        this.authenticate = new AuthenticateRout();
        this.usersRouter = new UsersRouterRout(aseDb);
        this.aseRouter = new AseRout(aseDb);
        this.connectionInUse = new ConnectionInUseRout(aseDb);
        this.rightsTranslations = new RightsTranslationsRout(aseDb);
        this.userRights = new UserRightsRout(aseDb);
    }

    public load() {
        this.app.use(this.authenticate.router);
        this.app.use(this.rightsTranslations.router);
        this.app.use(this.authMiddleware(), this.usersRouter.router);
        this.app.use(this.authMiddleware(), this.aseRouter.router);
        this.app.use(this.authMiddleware(), this.connectionInUse.router);
        this.app.use(this.authMiddleware(), this.userRights.router);
    }

    private authMiddleware(): (req, res, next) => void {
        return (req, res, next) => {
            const authToken: string = req.header(AUTH_COOKIE_TOKEN_NAME);
            if (authToken) {
                try {
                    const expiresIn: number = moment().add(DEFAULT_SECONDS_IN_SESSION, 'seconds').valueOf();
                    const decoded = jwt.verify(authToken, JWT_SECRET)
                    let loggedInUser = decoded['username'];
                    req['loggedInUser'] = loggedInUser;
                    console.log(`Time: ${moment.now()} --> Logged in user: ${loggedInUser}`);
                    res.setHeader('Access-Control-Allow-Headers', [AUTH_COOKIE_TOKEN_NAME, EXPIRATION_KEY]);
                    res.setHeader('Access-Control-Expose-Headers', '*');
                    res.setHeader(AUTH_COOKIE_TOKEN_NAME, generateAuthToken(loggedInUser), );
                    res.setHeader(EXPIRATION_KEY, expiresIn);
                    next();
                }
                catch (e) {
                    console.error(e);
                    res.status(401).send();
                }
            }
            else {
                res.redirect('/login');
                next();
            }

        }
    }

}

export default RoutesLoader;
