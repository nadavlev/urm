
// const Sybase = require("sybase");

// const fs = require('fs');
//
// class AseDb__ {
//
//     constructor() {
//         this.details = {};
//         let persistedConnections = fs.readFileSync(CONNECTIONS_FILE); //{[server:port:database]: connectedDataBases:{connection, lastUse, isValidated}}
//         this.connectionDictionary = JSON.parse(persistedConnections);
//         this.activeConnections = {};
//         this.dataBasesDictionary = {};// {[server:port:database]: details}
//     }
//

////
//     getConnections() {
//         return this.connectionDictionary;
//     }
//
//     setConnectionInUse(user, details) {
//         return new Promise((resolve, reject) => {
//             let connectionKey = getConnectionKey(details);
//             if (this.connectionDictionary[connectionKey]) {
//                 this.usedConnections[user] = connectionKey;
//                 try{
//                     fs.writeFileSync(USED_CONNECTION_FILE, JSON.stringify(this.usedConnections));
//                     resolve({"data": details, "ok": true});
//                 } catch(err) {
//                     reject({"data": {}, "ok": false});
//                 }
//             }
//             else {
//                 reject({"data": connectionKey, "ok": false});
//             }
//         })
//     }
//
//

//
//     safeDisconnect(user) {
//         let db = this.connectionDictionary[user].database;
//         if (db.connected) {
//             db.disconnect();
//         }
//         this.connectionDictionary[user].database = undefined;
//     }
// }
//

import * as fs from "fs"
import {ConnectionDetails} from "../../urm-client/src/app/models/connection-details.ase.model";
import {getConnectionKey} from "../../shared/connection.utils";
const Sybase = require('sybase');
const CONNECTIONS_FILE = 'connections_db.txt';
const USED_CONNECTION_FILE = 'used_connections_db.txt';
const PATH_TO_JAR = 'node_modules/sybase/JavaSybaseLink/dist/JavaSybaseLink.jar';

class AseDB {
    private connectionDictionary: object = {};
    private usedConnections: object = {};
    private activeConnections = {};
    private dataBasesDictionary = {};// {[server:port:database]: details}

    constructor() {
        let persistedConnections = fs.readFileSync(CONNECTIONS_FILE); //{[server:port:database]: connectedDataBases:{connection, lastUse, isValidated}}
        this.connectionDictionary = JSON.parse(persistedConnections.toString());
        let persistedUsedConnections = fs.readFileSync(USED_CONNECTION_FILE);
        this.usedConnections = JSON.parse(persistedUsedConnections.toString());

    }

    getConnections() {
        return this.connectionDictionary;
    }

    saveConnectionDetails(details: ConnectionDetails) {
        let connectionKey = getConnectionKey(details);
        this.connectionDictionary[connectionKey] = details;
        return this.wrightConnectionsToFile(this.connectionDictionary);
    }

    deleteConnection(key: string) {
        delete this.connectionDictionary[key];
        return this.wrightConnectionsToFile(this.connectionDictionary);
    }

    private wrightConnectionsToFile(connections): Promise<object> {
        return new Promise((resolve, reject) => {
            fs.writeFile(CONNECTIONS_FILE, JSON.stringify(connections), err => {
                if (err) {
                    console.error(err);
                    reject({"data": 'could not wright to connections file', "OK": false});
                }
                else {
                    resolve({data: this.getConnections(), "ok": true});
                }
            })
        })
    }

     testConnection(details) {
        return new Promise((resolve, reject) => {
            let database = this.createDB(details);
            database.connect(function(err){
                if (err) {
                    reject(err);
                }
                else {
                    resolve({});
                }
            });
        })
    }

    getConnectionInUse(user) {
        let connectionKey = this.usedConnections[user];
        let connectionDetails = this.connectionDictionary[connectionKey];
        if (connectionDetails) {
            return {key: connectionKey, connection: connectionDetails, "ok": true};
        }
        else {
            return {err: 'Connection not found', "OK": false};
        }
    }

    setConnectionInUse(user, details) {
        let key = getConnectionKey(details);
        this.usedConnections[user] = key;
        return {key, connection: details};
    }

    createDB(details) {
        if (!!details.server) {
            return new Sybase(details.server, details.port, details.database, details.user, details.password, true, PATH_TO_JAR);
        }
    }

    getUsers(user) {
        const connectionKey = this.usedConnections[user];
        return this.connectToDb(connectionKey).then(response => {
            let connectedDb = response;
            const query = 'select reg_num, user_type, user_mode, is_sso_user ' +
                'from USERS order by reg_num ';
            return this.runQuery(query, connectedDb);
        }, err => {
            console.log(err);
        })
    }

    connectToDb(connectionKey) {
        let connectionDetails = this.connectionDictionary[connectionKey];
        let activeConnection = this.activeConnections[connectionKey];
        if (!activeConnection) {
            this.activeConnections[connectionKey] = this.createDB(connectionDetails);
            return this.makeConnection(this.activeConnections[connectionKey])      ;
        }
        else {
            if (this.activeConnections[connectionKey].connected) {
                return Promise.resolve(this.activeConnections[connectionKey]);
            }
            else {
                return this.makeConnection(this.activeConnections[connectionKey]);
            }
        }
    }

    makeConnection(db) {
        return new Promise((resolve, reject) => {
            db.connect(err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(db);
                }
            });
        })
    }


    runQuery(query, db) {
        return new Promise((resolve, reject) => {
            db.query(query, function (err, data) {
                if (err) {
                    reject({err, data});
                }
                else {
                    resolve({err, data});
                }
            });
        });
    }

    getUserRights(user: string, selectedUser: string): Promise<any> {
        const connectionKey = this.usedConnections[user];
        const query = `SELECT reg_num, right_vector_num, right_vector, LUT, version, system_type\n` +
            `FROM admin.dbo.USER_RIGHTS where reg_num = '${selectedUser}'`;
        return this.connectToDb(connectionKey).then((connectedDb) => {
            return this.runQuery(query, connectedDb);
        });
    }

    async setUserRights(user, details) {
        const connectionKey = this.usedConnections[user];
        const promiseArray = [];
        if (details) {
            this.connectToDb(connectionKey).then((connectedDb) => {
                for (let updatedRight of details) {
                    const rightVector = updatedRight.right_vector;
                    const vectorNum = updatedRight.right_vector_num;
                    const system_type = updatedRight.system_type;
                    const regNum = updatedRight.reg_num;
                    console.log(`UPDATE user:${regNum}: vector ${vectorNum} to ${rightVector}`);

                    let query = `UPDATE admin.dbo.USER_RIGHTS SET right_vector = ${rightVector},
                    LUT = GETDATE()
                    WHERE reg_num = '${regNum}' AND
                    right_vector_num = ${vectorNum} AND
                    system_type = ${system_type}`;
                    console.log(query);

                        let p = this.runQuery(query, connectedDb);
                        promiseArray.push(p);
                }
                // this.safeDisconnect();
                return Promise.all(promiseArray);
            });
        }
        else {

            return Promise.resolve([]);
        }

    }

}

export default AseDB;
