import express from 'express'
import {EMPTY_PATH} from "../../shared/api.constants";
import AseDB from "../dbOps/AseDb";

class AseRout {
    private aseDb:AseDB;
    public router = express.Router();
    private path: string = EMPTY_PATH;

    constructor(aseDb: AseDB) {
        this.aseDb = aseDb;
        this.initRouts();
    }

    private initRouts() {
        this.router.get( this.path, (req, res) => {
            res.status(200);
            res.send({"data": this.aseDb.getConnections(), "ok": true});
        })
        this.router.put(this.path, (req, res, next) => {
            this.aseDb.saveConnectionDetails(req.body).then(response => {
                res.status(200);
                res.send({"data": response['data'], "ok": response['ok']});
            }, err => {
                next(err);
                // res.status(500);
                // res.send({error: err, "ok": false});
            }).catch(next);
        });
        this.router.post(this.path, (req, res, next) => {
            this.aseDb.testConnection(req.body).then( () => {
                res.status(200);
                res.send({"ok": true});
            }, err => {
                next(err);
                // console.error(err);
                // res.status(500);
                // res.send({"err": err.message, "ok": false});
            }).catch(next);
        })
        this.router.delete(this.path, (req, res, next) => {
            let key = req.query.key.toString();
            this.aseDb.deleteConnection(key).then( response => {
                res.status(200);
                res.send({data: response});
            }, err => {
                next(err);
                // res.status(500);
                // console.error(err);
            }).catch(next)
        });
    }
}

export default AseRout;
