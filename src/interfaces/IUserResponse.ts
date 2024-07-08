export interface IUserResponse {
  stat: string;
  response: Response[];
}

export interface Response {
  alias1: string;
  alias2: string;
  alias3: null;
  alias4: null;
  aliases: Aliases;
  created: number;
  email: string;
  enable_auto_prompt: boolean;
  external_id: string;
  firstname: string;
  groups: Group[];
  is_enrolled: boolean;
  last_directory_sync: number;
  last_login: number;
  lastname: string;
  lockout_reason: null;
  notes: string;
  phones: Phone[];
  realname: string;
  status: string;
  tokens: Token[];
  u2ftokens: any[];
  user_id: string;
  username: string;
  webauthncredentials: Webauthncredential[];
}

export interface Aliases {
  alias1: string;
  alias2: string;
}

export interface Group {
  desc: string;
  group_id: string;
  mobile_otp_enabled: boolean;
  name: string;
  push_enabled: boolean;
  sms_enabled: boolean;
  status: string;
  voice_enabled: boolean;
}

export interface Phone {
  activated: boolean;
  capabilities: string[];
  encrypted: string;
  extension: string;
  fingerprint: string;
  last_seen: Date;
  model: string;
  name: string;
  number: string;
  phone_id: string;
  platform: string;
  postdelay: string;
  predelay: string;
  screenlock: string;
  sms_passcodes_sent: boolean;
  tampered: string;
  type: string;
}

export interface Token {
  serial: string;
  token_id: string;
  type: string;
}

export interface Webauthncredential {
  credential_name: string;
  date_added: number;
  label: string;
  webauthnkey: string;
}
