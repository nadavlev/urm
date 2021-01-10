import * as fs from "fs"
import {ConnectionDetails} from "../../shared/connection-details.ase.model";
import {getConnectionKeyFromConnectionDetails, getConnectionKeyFromSybaseObject} from "../../shared/connection.utils";
const Sybase = require('sybase');
const CONNECTIONS_FILE = 'connections_db.txt';
const USED_CONNECTION_FILE = 'used_connections_db.txt';
const PATH_TO_JAR = 'node_modules/sybase/JavaSybaseLink/dist/JavaSybaseLink.jar';
import * as _ from 'lodash';
import {AseRights} from "../../shared/models/rights.model";

class AseDB {
    private connectionDictionary: object = {};
    private usedConnections: object = {};
    private activeConnections = {};

    constructor() {
        let persistedConnections = fs.readFileSync(CONNECTIONS_FILE);
        this.connectionDictionary = JSON.parse(persistedConnections.toString());
        let persistedUsedConnections = fs.readFileSync(USED_CONNECTION_FILE);
        this.usedConnections = JSON.parse(persistedUsedConnections.toString());

    }

    getConnections() {
        return this.connectionDictionary;
    }

    saveConnectionDetails(details: ConnectionDetails) {
        let connectionKey = getConnectionKeyFromConnectionDetails(details);
        this.connectionDictionary[connectionKey] = details;
        return this.wrightConnectionsToFile(this.connectionDictionary);
    }

    deleteConnection(key: string) {
        delete this.connectionDictionary[key];
        this.wrightConnectionsToFile(this.connectionDictionary).then(result => {
           console.log(result);
        });
        return Promise.resolve(this.connectionDictionary);
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
            try {
                let database = this.createDB(details);
                database.connect(function(err){
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({});
                    }
                });
            }catch (e) {
                console.warn(e);
                reject(e);
            }
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

    setConnectionInUse(user, details):  Promise<{data: string, "ok": boolean}> {
        return new Promise((resolve, reject) => {
            let connectionKey = getConnectionKeyFromConnectionDetails(details);
            if (this.connectionDictionary[connectionKey]) {
                this.usedConnections[user] = connectionKey;
                try{
                    fs.writeFileSync(USED_CONNECTION_FILE, JSON.stringify(this.usedConnections));
                    resolve({"data": connectionKey, "ok": true});
                } catch(err) {
                    reject({"data": {}, "ok": false});
                }
            }
            else {
                reject({"data": connectionKey, "ok": false});
            }
        })
    }

    createDB(details) {
        if (!!details.server) {
            return new Sybase(details.server, details.port, details.database, details.user, details.password, true, PATH_TO_JAR);
        }
    }

    getUsers(user) {
        const connectionKey = this.usedConnections[user];
        if (connectionKey) {
            return this.connectToDb(connectionKey).then(response => {
                let connectedDb = response;
                const query = `select
                                u.reg_num,
                                    u.user_type,
                                    u.user_mode,
                                    u.user_level,
                                    u.version,
                                    u.is_sso_user,
                                    us.user_expiration_time,
                                    us.pswd_expiration_time,
                                    us.last_login_time,
                                    us.last_logout_time,
                                    us.login_fail_count,
                                    us.last_ip_address,
                                    cu.user_description,
                                    cu.system_type
                                from dbo.USERS as u
                                INNER JOIN dbo.USER_SECURITY as us on u.reg_num = us.reg_num
                                LEFT JOIN dbo.CONFIG_USERS as cu on u.user_type = cu.user_type and u.user_mode = cu.user_mode and u.user_level = cu.user_level
                                order by u.reg_num`;
                return this.runQuery(query, connectedDb);
            }, err => {
                console.log(err);
            })
        }
        else {
            return  Promise.reject('Connection was not selected, please verify that you selected a connection in connections page');
        }
    }

    connectToDb(connectionKey) {
        let connectionDetails = this.connectionDictionary[connectionKey];
        let activeConnection = this.activeConnections[connectionKey];
        if (!activeConnection || !activeConnection?.connected) {
            this.activeConnections[connectionKey] = this.createDB(connectionDetails);
            return this.makeConnection(this.activeConnections[connectionKey]);
        }
        else {
            return Promise.resolve(activeConnection);
        }
    }


    makeConnection(db) {
        return new Promise((resolve, reject) => {
            try {
                db.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(db);
                    }
                });
            } catch (e) {
                console.error(e);
            }
        })
    }


    runQuery(query, db) {
        return new Promise((resolve, reject) => {
            db.query(query, (err, data) => {
                console.log(err);
                if (err && _.isString(err) && err.search(/JZ0C0/) != -1) {
                    db.disconnect();
                    let connectionKey = getConnectionKeyFromSybaseObject(db);
                    delete this.activeConnections[connectionKey];
                }
                resolve({err, data});
            });
        }).catch(exception => {
            if (exception.err.message.search(/JZ0C0/) != -1) {
                db.disconnect();
                let connectionKey = getConnectionKeyFromSybaseObject(db);
                delete this.activeConnections[connectionKey];
            }
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

    async setUserRights(user: string, details: AseRights[]) {
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
                return Promise.all(promiseArray);
            });
        }
        else {

            return Promise.resolve([]);
        }

    }

}

export default AseDB;
