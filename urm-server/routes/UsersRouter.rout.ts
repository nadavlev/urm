import express from 'express';
import {EMPTY_PATH} from "../../shared/api.constants";
import AseDB from "../dbOps/AseDb";

class UsersRouterRout {
    public router = express.Router();
    private path: string = EMPTY_PATH;
    private aseDb: AseDB;

    constructor(aseDb: AseDB) {
        this.initRouts();
        this.aseDb = aseDb;
    }

    private initRouts() {
        this.router.get(this.path, (req, res, next) => {
            this.aseDb.getUsers(req['loggedInUser']).then(response => {
                res.send({data: response['data'], "ok": true});
            }, err => {
                console.error(err);
                next(err);
                //res.status(500).send({err, "ok": false});
            }).catch(next);
        });
    }

}

export default UsersRouterRout;
