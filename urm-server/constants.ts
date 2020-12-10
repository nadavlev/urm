import * as jwt from "jsonwebtoken";
import {DEFAULT_SECONDS_IN_SESSION} from "../shared/api.constants";

export const JWT_SECRET = 'abcdefg987654';

export function generateAuthToken(username: string, secondsToExpire?: number): any {
    return jwt.sign({username}, JWT_SECRET, {
        expiresIn: secondsToExpire || DEFAULT_SECONDS_IN_SESSION,
    });
}
