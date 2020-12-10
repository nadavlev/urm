import express from 'express';
import {API_USERS} from "../../shared/api.constants";
import AseDB from "../dbOps/AseDb";

class UsersRouterRout {
    public router = express.Router();
    private path: string = API_USERS;
    private aseDb: AseDB;

    constructor(aseDb: AseDB) {
        this.initRouts();
        this.aseDb = aseDb;
    }

    private initRouts() {
        this.router.get(this.path, (req, res) => {
            this.aseDb.getUsers(req['loggedInUser']).then(response => {
                res.send({data: response['data'], "ok": true});
            }, err => {
                console.error(err);
                res.status(500).send({err, "ok": false});
            })
        });
    }

}

export default UsersRouterRout;
