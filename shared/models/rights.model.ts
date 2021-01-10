
export enum AseRightsFields {
  LUT = "LUT",
  UserName = "reg_num",
  RightVector = "right_vector",
  RightVectorNumber = "right_vector_num",
  SystemType = "system_type",
  Version = "version",
}

export interface AseRights{
  [AseRightsFields.LUT]: Date;
  [AseRightsFields.UserName]: string;
  [AseRightsFields.RightVector]: number;
  [AseRightsFields.RightVectorNumber]: number;
  [AseRightsFields.SystemType]: number; //TODO: Enum
  [AseRightsFields.Version]: number;
}

export enum RightsModelFields {
  LUT = "LUT",
  UserName = "userName",
  RightsVector = "rightVector",
  RightsVectorNumber = "rightVectorNum",
  SystemType = "systemType",
  Version = "version",
}

export interface RightsModel {
  [RightsModelFields.LUT]: Date;
  [RightsModelFields.UserName]: string;
  [RightsModelFields.RightsVector]: number;
  [RightsModelFields.RightsVectorNumber]: number;
  [RightsModelFields.SystemType]: number;
  [RightsModelFields.Version]: number;
}

export interface RightRow {
  title: string,
  vector: number,
  bit: number,
  value_1: boolean,
  value_2: boolean
}

export interface RightRowPendingChange {
  title: string,
  vector: number,
  bit: number,
  value: boolean,
  subsystem: number
}

export class ViewDefinitions {
  system1: boolean;
  system2: boolean;
}

export interface RightsTableData {
  rightsMap: Map<string, RightRow>,
  viewDefinitions: ViewDefinitions
}

export enum SystemType {
  "RX" = 1,
  "VX" = 2
}
