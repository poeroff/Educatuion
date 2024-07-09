export interface AccessTokenType {
  token: string;
  access_id: string;
}

export interface CommonRequestBodyType {
  accessToken: AccessTokenType;
  siteId: string;
  homepage: string;
  userId: string;
  sessionId: string;
}

export interface TextMovedRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
}

export interface TextLeftRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
  duration: number;
}

export interface VideoPlayedRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
  time: number;
  duration: number;
}

export interface VideoPausedRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  playTime: number;
  duration: number;
}

export interface VideoSkippedRequestBodyType extends CommonRequestBodyType {
  contentId: string;
  timeFrom: number;
  timeTo: number;
  skipTo: number;
  playTime: number;
  duration: number;
}

export interface VideoMutedRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
  time: number;
  volume: number;
}

export interface VideoTimeUpdatedRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  playTime: number;
  duration: number;
}

export interface VideoCompletedRequestBodyType extends CommonRequestBodyType {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  playTime: number;
  duration: number;
}
