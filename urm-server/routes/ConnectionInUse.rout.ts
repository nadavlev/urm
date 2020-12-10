import express from 'express'
import {API_CONNECTION_IN_USE} from "../../shared/api.constants";
import AseDB from "../dbOps/AseDb";

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
            res.send(this.aseDb.getConnectionInUse(req['loggedInUser']));
        })
        this.router.put(this.path, (req, res) => {
            this.aseDb.setConnectionInUse(req['loggedInUser'], req.body).then(response => {
                res.status(200).send({key: response['data'], connection: req['body'] });
            }, err => {
                console.error(err);
                res.status(500).send({"ok": false});
            });
        })
    }

}

export default ConnectionInUseRout;
