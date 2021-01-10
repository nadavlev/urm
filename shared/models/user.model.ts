

export enum AseUserFields {
  UserName = "reg_num",
  UserType = "user_type",
  UserMode = "user_mode",
  UserLevel = "user_level",
  version = "version",
  isSSO = "is_sso_user",
  userExpirationTime = "user_expiration_time",
  passwordExpirationTime = "pswd_expiration_time",
  lastLoginTime = "last_login_time",
  lastLogoutTime = "last_logout_time",
  loginFailCount = "login_fail_count",
  lastIpAddress = "last_ip_address",
  userDescription = "user_description",
  systemType = "system_type"
}

export interface UrmUser {
  [AseUserFields.UserName]: string;
  [AseUserFields.UserType]: number;
  [AseUserFields.UserMode]: number;
  [AseUserFields.UserLevel]: number;
  [AseUserFields.version]: number;
  [AseUserFields.isSSO]: boolean;
  [AseUserFields.userExpirationTime]: Date;
  [AseUserFields.lastLoginTime]: Date;
  [AseUserFields.lastLogoutTime]: Date;
  [AseUserFields.loginFailCount]: number;
  [AseUserFields.lastIpAddress]: string;
  [AseUserFields.userDescription]: string;
}

