// export class Feedback {
//     feedbackId?: number;
//     userId!: number;
//     wifiSchemeId!: number;
//     category!: string;
//     feedbackText!: string;
//     date!: Date;
//   }

import { User } from './user.model';
import { WifiScheme } from './wifi-scheme.model';

export type FeedbackCategory =
  | 'Service'
  | 'Pricing'
  | 'Speed'
  | 'Support';

export interface FeedbackUserReference {
  userId: number;
}

export interface FeedbackSchemeReference {
  wifiSchemeId: number;
}

export interface CreateFeedbackRequest {
  feedbackText: string;
  category: FeedbackCategory;
  date: string;
  user: FeedbackUserReference;
  wifiScheme?: FeedbackSchemeReference;
}

export interface Feedback {
  feedbackId?: number;
  feedbackText: string;
  category: FeedbackCategory;
  date: Date | string;
  user?: User;
  wifiScheme?: WifiScheme;
}