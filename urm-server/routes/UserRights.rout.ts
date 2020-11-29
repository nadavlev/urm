import express from 'express';
import {API_USER_RIGHTS, USER_NAME} from "../../shared/api.constants";
import AseDb from '../dbOps/AseDb';
import AseDB from "../dbOps/AseDb";

class UserRightsRout {
    public router: express.Router = express.Router();
    public path = API_USER_RIGHTS;
    private aseDb: AseDb;

    constructor(aseDb: AseDB) {
        this.initRouts();
        this.aseDb = aseDb;
    }

    initRouts() {
        this.router.get(this.path, (req, res) => {
            let selectedUser = req.query.selectedUser.toString()
            this.aseDb.getUserRights(USER_NAME, selectedUser).then(data => {
                res.send(data);
            }, err => {
                console.error(err);
                res.send({err, "ok": false});
            });
        });
        this.router.post(this.path, (req, res) => {
            let details = req.body.rightsData;
            this.aseDb.setUserRights(USER_NAME, details).then(data => {
                res.send({data, "ok": true});
            }, err => {
                console.error(err);
                res.send({err, "ok": false});
            });
        })
    }
}

export default UserRightsRout;

