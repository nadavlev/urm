import express from 'express'
import {API_CONNECTION} from "../../shared/api.constants";
import AseDB from "../dbOps/AseDb";

class AseRout {
    private aseDb:AseDB;
    public router = express.Router();
    public path: string = API_CONNECTION //  "/api/ase/connection"

    constructor(aseDb: AseDB) {
        this.aseDb = aseDb;
        this.initRouts();
    }

    private initRouts() {
        this.router.get(this.path, (req, res) => {
            res.status(200);
            res.send({"data": this.aseDb.getConnections(), "ok": true});
        })
        this.router.put(this.path, (req, res) => {
            this.aseDb.saveConnectionDetails(req.body).then(response => {
                res.status(200);
                res.send({"data": response['data'], "ok": response['ok']});
            }, err => {
                res.status(500);
                res.send({error: err, "ok": false});
            })
        });
        this.router.post(this.path, (req, res) => {
            this.aseDb.testConnection(req.body).then( () => {
                res.status(200);
                res.send({"ok": true});
            }, err => {
                console.error(err);
                res.status(500);
                res.send({"err": err.message, "ok": false});
            });
        })
        this.router.delete(this.path, (req, res) => {
            let key = req.query.key.toString();
            this.aseDb.deleteConnection(key).then( response => {
                res.status(200);
                res.send(response);
            }, err => {
                res.status(500);
                console.error(err);
            })
        });
    }
}

export default AseRout;
