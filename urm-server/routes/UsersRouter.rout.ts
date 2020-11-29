import express from 'express';
import {API_USERS, USER_NAME} from "../../shared/api.constants";
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
            this.aseDb.getUsers(USER_NAME).then(response => {
                res.send({data: response['data'], "ok": true});
            }, err => {
                console.error(err);
                res.send({err, "ok": false});
            })
        });
    }

}

export default UsersRouterRout;
