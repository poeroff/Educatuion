import { SuperAppWebsocket } from '@wapl/superapp-websocket';
import {
  TextLeftRequestBodyType,
  TextMovedRequestBodyType,
  VideoCompletedRequestBodyType,
  VideoMutedRequestBodyType,
  VideoPausedRequestBodyType,
  VideoPlayedRequestBodyType,
  VideoSkippedRequestBodyType,
  VideoTimeUpdatedRequestBodyType,
} from '../types/lrs.type';
import {
  POST_TEXT_MOVED_URL,
  POST_TEXT_LEFT_URL,
  POST_VIDEO_PLAYED_URL,
  POST_VIDEO_PAUSED_URL,
  POST_VIDEO_SKIPPED_URL,
  POST_VIDEO_MUTED_URL,
  POST_VIDEO_TIME_UPDATED_URL,
  POST_VIDEO_COMPLETED_URL,
} from '../constants';

const env = {
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
};

export const ws = new SuperAppWebsocket({
  reconnect: false,
  excludeServiceNames: ['제외할 서비스 명'],
});

ws.setUrl(env.SOCKET_URL);

export const postRequest = async <T>(
  url: string,
  requestBody: {
    [key: string]: any;
  },
) => {
  try {
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: url, body: requestBody });
    return data.body;
  } catch (e: unknown) {
    console.error('getPageId Error:', e);
    return { status: 'error', message: '서버가 불안정 합니다.' };
  }
};

const floatToInt = (requestBody: { [key: string]: any }) => {
  return {
    ...requestBody,
    time: requestBody.time && Math.round(requestBody.time),
    timeFrom: requestBody.timeFrom && Math.round(requestBody.timeFrom),
    timeTo: requestBody.timeTo && Math.round(requestBody.timeTo),
    skipTo: requestBody.skipTo && Math.round(requestBody.skipTo),
    playTime: requestBody.playTime && Math.round(requestBody.playTime),
    duration: requestBody.duration && Math.round(requestBody.duration),
  };
};

export const postTextMoved = async (requestBody: TextMovedRequestBodyType) => {
  return postRequest<TextMovedRequestBodyType>(POST_TEXT_MOVED_URL, requestBody);
};

export const postTextLeft = async (requestBody: TextLeftRequestBodyType) => {
  return postRequest<TextLeftRequestBodyType>(POST_TEXT_LEFT_URL, requestBody);
};

export const postVideoPlayed = async (requestBody: VideoPlayedRequestBodyType) => {
  return postRequest<VideoPlayedRequestBodyType>(POST_VIDEO_PLAYED_URL, floatToInt(requestBody));
};

export const postVideoPaused = async (requestBody: VideoPausedRequestBodyType) => {
  return postRequest<VideoPausedRequestBodyType>(POST_VIDEO_PAUSED_URL, floatToInt(requestBody));
};

export const postVideoSkipped = async (requestBody: VideoSkippedRequestBodyType) => {
  return postRequest<VideoSkippedRequestBodyType>(POST_VIDEO_SKIPPED_URL, floatToInt(requestBody));
};

export const postVideoMuted = async (requestBody: VideoMutedRequestBodyType) => {
  return postRequest<VideoMutedRequestBodyType>(POST_VIDEO_MUTED_URL, floatToInt(requestBody));
};

export const postVideoTimeUpdated = async (requestBody: VideoTimeUpdatedRequestBodyType) => {
  return postRequest<VideoTimeUpdatedRequestBodyType>(POST_VIDEO_TIME_UPDATED_URL, floatToInt(requestBody));
};

export const postVideoCompleted = async (requestBody: VideoCompletedRequestBodyType) => {
  return postRequest<VideoCompletedRequestBodyType>(POST_VIDEO_COMPLETED_URL, floatToInt(requestBody));
};
