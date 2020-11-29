// var _ = require('lodash');
// var express = require('express');
// var router = express.Router();
// const AseDb = require('../dbOps/AseDb');
// const aseDb = new AseDb();
// const USER_NAME = 'temp_user_name';
//
//
//
//
//
// router.post('/connect', async function(req, res) {
//     aseDb.connect(USER_NAME, req.body).then(data => {
//         res.send({data, "ok": true})
//     }, err => {
//         console.error(err);
//         res.send({err, "ok": false})
//     });
// });
// readAndSaveRightsTranslations();
//
// module.exports = router;

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
            res.send({"data": this.aseDb.getConnections(), "ok": true});
        })
        this.router.put(this.path, (req, res) => {
            this.aseDb.saveConnectionDetails(req.body).then(response => {
                res.send({"data": response['data'], "ok": response['ok']});
            })
        });
        this.router.post(this.path, (req, res) => {
            this.aseDb.testConnection(req.body).then( () => {
                res.send({"ok": true});
            }, err => {
                console.error(err);
                res.send({"err": err.message, "ok": false});
            });
        })
        this.router.delete(this.path, (req, res) => {
            let key = req.query.key.toString();
            this.aseDb.deleteConnection(key).then( response => {
                res.send(response);
            }, err => {
                console.error(err);
            })
        });
    }
}

export default AseRout;
