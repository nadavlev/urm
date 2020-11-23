var _ = require('lodash');
var express = require('express');
var router = express.Router();
const AseDb = require('../dbOps/AseDb');
const aseDb = new AseDb();
const fs = require('fs');
const parseString = require('xml2js').parseString;
const USER_NAME = 'temp_user_name';

let rightsTranslationsArray = [];


router.post('/testConnection', async function(req, res, next) {
    aseDb.testConnection(req.body).then( () => {
        res.send({"ok": true});
    }, err => {
        console.error(err);
        res.send({"err": err.message, "ok": false});
    });
});

router.put('/connection', async function(req, res){
    aseDb.saveConnectionDetails(req.body).then(response => {
        res.send({"data": response.data, "ok": response.ok});
    })
});

router.get('/connection', async function(req, res) {
    res.send({"data": aseDb.getConnections(), "ok": true});
})

router.put('/connectionInUse', (req, res) => {
    res.send(aseDb.setConnectionDetails(USER_NAME, req.body));
})

router.get('/connectionInUse', (req, res) => {
    res.send(aseDb.getConnectionInUse(USER_NAME));
})


router.post('/connect', async function(req, res) {
    aseDb.connect(USER_NAME, req.body).then(data => {
        res.send({data, "ok": true})
    }, err => {
        console.error(err);
        res.send({err, "ok": false})
    });
});

router.get('/users', async function(req, res, next) {
    aseDb.getUsers(USER_NAME).then(response => {
        res.send({data: response['data'], "ok": true});
    }, err => {
        console.error(err);
        res.send({err, "ok": false});
    })
});

router.post('/user-rights', async function(req, res, next) {
    aseDb.getUserRights(USER_NAME).then(data => {
        res.send({data, "ok": true});
    }, err => {
        console.error(err);
        res.send({err, "ok": false});
    });
})

router.put('/user-rights', async function(req, res) {
    aseDb.setUserRights(USER_NAME).then(data => {
        res.send({data, "ok": true});
    }, err => {
        console.error(err);
        res.send({err, "ok": false});
    });
})

router.get('/user-rights-translations', (req, res) => {
    res.send({data: rightsTranslationsArray, "ok": true});
})

function extractTranslation(acc, cur) {
    let splitString = cur.comment[0].split(' ');
    let vector = splitString[1];
    let bit = splitString[3];
    if (!acc[vector]) {
        acc[vector] = [];
    }
    acc[vector][bit] = cur.value[0];
    return acc;
}

function fillMissingTranslations(translationMatrix) {
    for (let bit in translationMatrix) {
        for (let i = 0; i <=32; i++) {
            if (!translationMatrix[bit][i]) {
                translationMatrix[bit][i] = `vector ${bit} bit ${i}`;
            }
        }
    }
    return translationMatrix;
}

function readAndSaveRightsTranslations() {
    fs.readFile('./resources/ENG004.resx', (err, data) => {
        parseString(data, function (err, result) {
            if (err) {
                console.error(err);
            }
            const translations = result.root.data.filter(obj => _.toNumber(obj.$.name) >= 52000 && _.toNumber(obj.$.name) <= 53000 );
            const returnValues = translations.reduce((acc, cur) => extractTranslation(acc, cur), []);
            rightsTranslationsArray = fillMissingTranslations(returnValues);
        });
    });


}
readAndSaveRightsTranslations();

module.exports = router;
