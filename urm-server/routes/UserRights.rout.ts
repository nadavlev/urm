import express from 'express';
import {API_USER_RIGHTS} from "../../shared/api.constants";
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
        this.router.get(this.path, (req, res, next) => {
            let selectedUser = req.query.selectedUser.toString()
            this.aseDb.getUserRights(req['loggedInUser'], selectedUser).then(data => {
                res.send(data);
            }, err => {
                console.error(err);
                next(err);
                // res.status(500);
                // res.send({err, "ok": false});
            }).catch(next);
        });
        this.router.post(this.path, (req, res, next) => {
            let details = req.body.rightsData;
            this.aseDb.setUserRights(req['loggedInUser'], details).then(data => {
                res.send({data, "ok": true});
            }, err => {
                console.error(err);
                next(err);
                // res.status(500);
                // res.send({err, "ok": false});
            }).catch(next);
        })
    }
}

export default UserRightsRout;

