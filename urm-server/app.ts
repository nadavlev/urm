import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors'
import UsersRouterRout from "./routes/UsersRouter.rout";
import AseRout from "./routes/Ase.rout";

class App {
    public app: express.Application;
    public port: number = 5000;


    constructor(
        routers,
        port: number
    ) {
        this.app = express();
        this.port = port;

        this.initMiddlewares();
        this.initRouters(routers);
    }

    private initMiddlewares() {
        this.app.use(cors());

        this.app.use(bodyParser.json());
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

}

export default App;

// const app = express();
//
// //TODO: user cors only when in debug mode
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/api/ase', aceRouter);
// app.use('/api/ase/users', usersRouter);
// app.use('**', indexRouter);
//
// module.exports = app;
