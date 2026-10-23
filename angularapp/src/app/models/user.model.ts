export type UserRole =
  'ADMIN' | 'USER' | 'MANAGER';

export interface User {
  userId?: number;
  email: string;
  password: string;
  username: string;
  mobileNumber: string;
  userRole: UserRole;
}