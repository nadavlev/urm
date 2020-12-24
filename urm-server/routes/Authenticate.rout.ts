import express from 'express';
import {
    API_AUTHENTICATE,
    AUTH_COOKIE_TOKEN_NAME,
    DEFAULT_SECONDS_IN_SESSION,
    EXPIRATION_KEY
} from "../../shared/api.constants";
import {generateAuthToken} from "../constants";

const MASTER_USER_NAME = 'urm';
const MASTER_PASSWORD = 'urm123';

class AuthenticateRout {
    public router = express.Router();
    private path: string = API_AUTHENTICATE;

    constructor() {
        this.initRouts();
    }
    initRouts() {
        this.router.post(this.path, (req, res) => {
            const username = req.body['username'];
            const password = req.body['password'];
            if (username === MASTER_USER_NAME && password === MASTER_PASSWORD) {
                const authToken = generateAuthToken(username);
                res.setHeader('Access-Control-Allow-Headers', [AUTH_COOKIE_TOKEN_NAME, EXPIRATION_KEY]);
                res.setHeader('Access-Control-Expose-Headers', '*');
                res.setHeader(AUTH_COOKIE_TOKEN_NAME, authToken);
                res.setHeader(EXPIRATION_KEY, DEFAULT_SECONDS_IN_SESSION);
                res.status(200).send();
            }
            else {
                res.sendStatus(401);
            }
        })
    }
}

export default AuthenticateRout;
