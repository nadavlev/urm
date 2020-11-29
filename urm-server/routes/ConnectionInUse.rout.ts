import express from 'express'
import {API_CONNECTION_IN_USE} from "../../shared/api.constants";
import AseDB from "../dbOps/AseDb";

const USER_NAME = 'temp_user_name';

class ConnectionInUseRout {
    public router = express.Router();
    public path = API_CONNECTION_IN_USE
    private aseDb: AseDB;

    constructor(aseDb: AseDB) {
        this.aseDb = aseDb;
        this.initRouts();
    }

    private initRouts() {
        this.router.get(this.path, (req, res) => {
            res.send(this.aseDb.getConnectionInUse(USER_NAME));
        })
        this.router.put(this.path, (req, res) => {
            res.send(this.aseDb.setConnectionInUse(USER_NAME, req.body));
        })
    }

}

export default ConnectionInUseRout;
