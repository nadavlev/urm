import {ConnectionDetails} from "./connection-details.ase.model";

const KEY_CONNECTOR = '-';

export function getConnectionKeyFromConnectionDetails(connectionDetails: ConnectionDetails): string {
    const fieldsToUseInKey = [
        "server",
        "port",
        "user",
        "database"
    ];
    return extractValuesAndJoin(connectionDetails, fieldsToUseInKey);
}

export function getConnectionKeyFromSybaseObject(db): string {
    const fieldsToUseInKey = [
        "host",
        "port",
        "username",
        "dbname"
    ];
    return extractValuesAndJoin(db, fieldsToUseInKey);
}

function extractValuesAndJoin(obj: any, attrNames: string[]): string {
    const keyValues = [];
    attrNames.forEach(field => {
        keyValues.push(obj[field]);
    });
    return keyValues.join(KEY_CONNECTOR);
}
