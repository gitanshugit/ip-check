export interface IPData {
  ip: string;
  ipv6?: string | null;
  country: string;
  timestamp: string;
  time: string;
}

export interface NotificationData {
  message: string;
  type: 'success' | 'warning';
  show: boolean;
}