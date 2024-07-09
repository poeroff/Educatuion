export interface IAccessToken {
  token: string;
  access_id: string;
}

export interface ICommonInfo {
  accessToken: IAccessToken;
  siteId: string;
  homepage: string;
  userId: number;
  sessionId: string;
}

export interface VideoPlayedRequestBodyType extends ICommonInfo {
  cardPageId: number;
  time: number;
  duration: number;
}

export interface VideoPausedRequestBodyType extends ICommonInfo {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  playTime: number;
  duration: number;
}

export interface VideoSkippedRequestBodyType extends ICommonInfo {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  skipTo: number;
  playTime: number;
  duration: number;
}

export interface VideoMutedRequestBodyType extends ICommonInfo {
  cardPageId: number;
  time: number;
  volume: number;
}

export interface VideoTimeUpdatedRequestBodyType extends ICommonInfo {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  playTime: number;
  duration: number;
}

export interface VideoCompletedRequestBodyType extends ICommonInfo {
  cardPageId: number;
  timeFrom: number;
  timeTo: number;
  playTime: number;
  duration: number;
}

export interface ResponseBodyType {
  code: string;
  message: string;
}

export type TPostVideoPlayedFunc = (requestBody: VideoPlayedRequestBodyType) => Promise<ResponseBodyType>;

export type TPostVideoPausedFunc = (requestBody: VideoPausedRequestBodyType) => Promise<ResponseBodyType>;

export type TPostVideoSkippedFunc = (requestBody: VideoSkippedRequestBodyType) => Promise<ResponseBodyType>;

export type TPostVideoMutedFunc = (requestBody: VideoMutedRequestBodyType) => Promise<ResponseBodyType>;

export type TPostVideoTimeUpdatedFunc = (requestBody: VideoTimeUpdatedRequestBodyType) => Promise<ResponseBodyType>;

export type TPostVideoCompletedFunc = (requestBody: VideoCompletedRequestBodyType) => Promise<ResponseBodyType>;
