import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import AuthenticateRout from "./routes/authenticate.rout";
import * as jwt from 'jsonwebtoken';
import {AUTH_COOKIE_TOKEN_NAME, DEFAULT_SECONDS_IN_SESSION, EXPIRATION_KEY} from "../shared/api.constants";
import {generateAuthToken, JWT_SECRET} from "./constants";
import moment from 'moment';

class App {
    public app: express.Application;
    public port: number = 5000;
    public authTokens: any;


    constructor(
        routers,
        port: number
    ) {
        this.app = express();
        this.port = port;

        this.initMiddlewares();
        const authenticate = new AuthenticateRout();
        this.app.use(authenticate.router);

        this.app.use(this.authMiddleware());

        this.initRouters(routers);
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.disable('x-powered-by');
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(express.static('./build/public'));

    }

    private initRouters(routers: any[]) {
        routers.forEach(rout => {
            this.app.use(rout.router);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        })
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

export default App;
// //TODO: user cors only when in debug mode
// app.use(express.json());
