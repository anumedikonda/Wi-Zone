export type RequestStatus =
  'Pending' | 'Approved' | 'Rejected';

export type RequestStatusFilter =
  RequestStatus | '';

export interface RequestUser {
  userId?: number;
  username?: string;
  email?: string;
}

export interface RequestWifiScheme {
  wifiSchemeId?: number;
  schemeName?: string;
  region?: string;
}

export interface WifiSchemeRequest {
  wifiSchemeRequestId?: number;

  userId: number;
  wifiSchemeId: number;

  user?: RequestUser;
  wifiScheme?: RequestWifiScheme;

  requestDate: Date | string;
  status: RequestStatus;

  comments: string;
  proof: string;
  streetName: string;
  landmark: string;
  city: string;
  state: string;
  zipCode: string;
  preferredSetupDate: string;
  timeSlot: string;
}