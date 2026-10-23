// export interface WifiScheme {
//   wifiSchemeId?: number;
//   schemeName: string;
//   description: string;
//   region: string;
//   speed: string;
//   dataLimit: string;
//   fee: number;
//   availabilityStatus: string;
// }

export type AvailabilityStatus = 'Available' | 'Unavailable';

export interface WifiScheme {
  wifiSchemeId?: number;
  schemeName: string;
  description: string;
  region: string;
  speed: string;
  dataLimit: string;
  fee: number;
  availabilityStatus: AvailabilityStatus;
}