import express from 'express'
import AseDB from "../dbOps/AseDb";
import {API_RIGHTS_TRANSLATIONS} from "../../shared/api.constants";
import fs from 'fs';
// const parseString = require('xml2js').parseString;
import xml2js from 'xml2js';
import * as _ from 'lodash';

class RightsTranslationsRout {
    aseDb: AseDB;
    public router: express.Router = express.Router();
    public path: string = API_RIGHTS_TRANSLATIONS;
    rightsTranslationsArray = [];
    parseString = xml2js.parseString;


    constructor(aseDb: AseDB) {
        this.aseDb = aseDb;
        this.readAndSaveRightsTranslations();
        this.initRouts();
    }

    initRouts() {
        this.router.get(this.path, (req, res) => {
            res.send({data: this.rightsTranslationsArray, "ok": true});
        })
    }

    extractTranslation(acc, cur) {
        let splitString = cur.comment[0].split(' ');
        let vector = splitString[1];
        let bit = splitString[3];
        if (!acc[vector]) {
            acc[vector] = [];
        }
        acc[vector][bit] = cur.value[0];
        return acc;
    }

    fillMissingTranslations(translationMatrix) {
        for (let bit in translationMatrix) {
            for (let i = 0; i <= 32; i++) {
                if (!translationMatrix[bit][i]) {
                    translationMatrix[bit][i] = `vector ${bit} bit ${i}`;
                }
            }
        }
        return translationMatrix;
    }

    readAndSaveRightsTranslations() {
        fs.readFile('./resources/ENG004.resx', (err, data) => {
            this.parseString(data, (err, result) => {
                if (err) {
                    console.error(err);
                }
                const translations = result.root.data.filter(obj => _.toNumber(obj.$.name) >= 52000 && _.toNumber(obj.$.name) <= 53000 );
                const returnValues = translations.reduce((acc, cur) => this.extractTranslation(acc, cur), []);
                this.rightsTranslationsArray = this.fillMissingTranslations(returnValues);
            });
        });
    }
}

export default RightsTranslationsRout;
