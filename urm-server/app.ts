import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import RoutesLoader from "./RoutesLoader";

class App {
    public app: express.Application;
    public port: number = 5000;
    public authTokens: any;
    private routesLoader: RoutesLoader;


    constructor(
        port: number
    ) {
        this.app = express();
        this.port = port;

        this.initMiddlewares();

        this.initRouters();
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.disable('x-powered-by');
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(express.static('./build/public'));
    }

    private initRouters() {
        this.routesLoader = new RoutesLoader(this.app);
        this.routesLoader.load();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        })
    }



}

export default App;
// //TODO: user cors only when in debug mode
// app.use(express.json());
let app = new App(5000);
app.listen();
