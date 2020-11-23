const CONNECTIONS_FILE = 'connections_db.txt';
const USED_CONNECTION_FILE = 'used_connections_db.txt';
const Sybase = require("sybase");
const {getConnectionKey} = require("../shared/connection.utils");
const PATH_TO_JAR = 'node_modules/sybase/JavaSybaseLink/dist/JavaSybaseLink.jar';
const fs = require('fs');

class AseDb {

    constructor() {
        this.details = {};
        let persistedConnections = fs.readFileSync(CONNECTIONS_FILE); //{[server:port:database]: connectedDataBases:{connection, lastUse, isValidated}}
        this.connectionDictionary = JSON.parse(persistedConnections);
        let persistedUsedConnections = fs.readFileSync(USED_CONNECTION_FILE);
        this.usedConnections = JSON.parse(persistedUsedConnections);

        this.activeConnections = {};
        this.dataBasesDictionary = {};// {[server:port:database]: details}
    }

    testConnection(details) {
        return new Promise((resolve, reject) => {
            let database = this.createDB(details);
            database.connect(function(err){
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })
    }

    saveConnectionDetails(details) {
        return new Promise((resolve, reject) => {
            let connectionKey = getConnectionKey(details);
            this.connectionDictionary[connectionKey] = details;
            console.log(this.connectionDictionary);
            fs.writeFile(CONNECTIONS_FILE, JSON.stringify(this.connectionDictionary), err => {
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

    getConnections() {
        return this.connectionDictionary;
    }

    setConnectionInUse(user, details) {
        return new Promise((resolve, reject) => {
            let connectionKey = getConnectionKey(details);
            if (this.connectionDictionary[connectionKey]) {
                this.usedConnections[user] = connectionKey;
                try{
                    fs.writeFileSync(USED_CONNECTION_FILE, JSON.stringify(this.usedConnections));
                    resolve({"data": details, "ok": true});
                } catch(err) {
                    reject({"data": {}, "ok": false});
                }
            }
            else {
                reject({"data": connectionKey, "ok": false});
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

    createDB(details) {
        if (!!details.server) {
            return new Sybase(details.server, details.port, details.database, details.user, details.password, true, PATH_TO_JAR);
        }
    }

    getUserRights(user , details) {
        const query = `SELECT reg_num, right_vector_num, right_vector, LUT, version, system_type\n` +
            `FROM admin.dbo.USER_RIGHTS where reg_num = '${user}'`;
        return this.connectToDb().then(() => {
            return this.runQuery(query);
        });
    }

    async setUserRights(user , details) {
        const promiseArray = [];
        if (details.rightsData) {
            this.connectToDb().then(() => {
                for (let updatedRight of details.rightsData) {
                    const rightVector = updatedRight.right_vector;
                    const vectorNum = updatedRight.right_vector_num;
                    const system_type = updatedRight.system_type;
                    console.log(`UPDATE user:${regNum}: vector ${vectorNum} to ${rightVector}`);

                    let query = `UPDATE admin.dbo.USER_RIGHTS SET right_vector = ${rightVector}, 
                    LUT = GETDATE()  
                    WHERE reg_num = '${user}' AND 
                    right_vector_num = ${vectorNum} AND 
                    system_type = ${system_type}`;
                    console.log(query);

                        let p = this.runQuery(query, false);
                        promiseArray.push(p);
                }
                this.safeDisconnect();
                return Promise.all(promiseArray);
            });
        }
        else {

            return Promise.resolve([]);
        }

    }

    setConnectionDetails(user, details) {
        let key = getConnectionKey(details);
        this.usedConnections[user] = key;
        return {key, connection: details};
    }

    safeDisconnect(user) {
        let db = this.connectionDictionary[user].database;
        if (db.connected) {
            db.disconnect();
        }
        this.connectionDictionary[user].database = undefined;
    }
}

module.exports = AseDb;
