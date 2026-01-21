export type PlatformType = 'WEB' | 'ANDROID' | 'IOS';

export type NotificationEvent =
  | 'DEADLINE_D1'
  | 'DEADLINE_D3'
  | 'DEADLINE_D7'
  | 'INTERVIEW_1H_BEFORE'
  | 'INTERVIEW_D1'
  | 'INTERVIEW_D3'
  | 'INTERVIEW_DAY_9AM'
  | 'ETC_D1'
  | 'ETC_D3'
  | 'ETC_DAY_9AM';

export type NotificationPreferencesMap = Partial<
  Record<NotificationEvent, boolean>
>;

export interface NotificationPreferenceListItem {
  platform: PlatformType;
  event: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationPreferencesResponse {
  preferences: NotificationPreferenceListItem[];
}

export interface PutNotificationPreferenceRequest {
  platform: PlatformType;
  event: string;
  enabled: boolean;
}
