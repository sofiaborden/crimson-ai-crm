
import { ReactNode } from 'react';

export type View = 'home' | 'profile' | 'compliance' | 'people' | 'fundraising' | 'treasury' | 'data-entry' | 'events' | 'more' | 'settings' | 'system';

export interface NavItem {
  id: View;
  label: string;
  icon: ReactNode;
  subItems?: NavItem[];
}

export interface Donor {
  id: string;
  name: string;
  photoUrl: string;
  email: string;
  phone: string;
  address: string;
  contactInfo: {
      home: string;
      work: string;
      email: string;
      website: string;
  };
  aiBadges: string[];
  predictiveAsk: number;
  recurrencePrediction: string;
  suggestedAction: string;
  givingOverview: {
      totalRaised: number;
      consecutiveGifts: number;
      tier: string;
      topGifts: { name: string; value: number }[];
  };
  aiSnapshot: string;
}