export type NotificationType =
  | 'INTERVIEW_REMINDER'
  | 'DOCUMENT_DEADLINE'
  | 'STATUS_CHANGE'
  | 'SCHEDULE_REMINDER';

export type SourceType = 'INTERVIEW' | 'APPLICATION' | 'DOCUMENT' | 'SCHEDULE';

export interface Notification {
  notificationId: number;
  type: NotificationType;
  title: string;
  message: string;
  sourceType: SourceType;
  targetId: number;
  is_read: boolean;
  createdAt: string;
}

export interface GetNotificationsParams {
  cursorId?: number;
  size?: number;
}

export interface GetNotificationsResponse {
  notifications: Notification[];
  hasNext: boolean;
  nextCursorId: number | null;
}
