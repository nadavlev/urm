
export function getConnectionKey(connectionDetails) { //: ConnectionDetails : string
    const KEY_CONNECTOR = '-';
    const fieldsToUseInKey = [
        "server",
        "port",
        "user",
        "database"
    ];
    const keyValues = [];
    fieldsToUseInKey.forEach(field => {
        keyValues.push(connectionDetails[field]);
    });
    return keyValues.join(KEY_CONNECTOR);
}

