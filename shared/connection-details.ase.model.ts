export enum ConnectionDetailsFields {
  User = 'user',
  Password = 'password',
  Port = 'port',
  Server = 'server',
  Database = 'database',
  InUse = 'inUse',
  Lab = 'lab',
  Notes = 'notes',
}

export interface ConnectionDetails {
  [ConnectionDetailsFields.User]: string;
  [ConnectionDetailsFields.Password]: string;
  [ConnectionDetailsFields.Port]: number;
  [ConnectionDetailsFields.Server]: string;
  [ConnectionDetailsFields.Database]: string;
  [ConnectionDetailsFields.InUse]: boolean;
  [ConnectionDetailsFields.Lab]: string;
  [ConnectionDetailsFields.Notes]: string;

}

export interface SelectedConnection {
  key: string;
  connection: ConnectionDetails;
}
