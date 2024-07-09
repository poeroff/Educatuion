import { SuperAppWebsocket } from '@wapl/superapp-websocket';
import { requestDataSavePageType, userAccessLogType, userSubmissionType } from '../types/pageData';
import {
  GET_CARD_ID_LIST_URL,
  GET_USER_SUBMISSION_URL,
  POST_USER_LOG,
  POST_USER_SAVE_SUBMISSION,
  POST_USER_SUBMISSION,
  POST_USER_SUBMISSION_WITH_RESULT,
} from '../constants';

const env = {
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
};

export const ws = new SuperAppWebsocket({
  reconnect: false,
  excludeServiceNames: ['제외할 서비스 명'],
});

ws.setUrl(env.SOCKET_URL);

export const getPageId = async (activeCardId: string) => {
  try {
    // TODO: ws 자동 close 이슈 해결 후 삭제
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: GET_CARD_ID_LIST_URL, body: { activeCardId } });
    return data.body.cardPageIdList;
  } catch (e: unknown) {
    console.error('getPageId Error:', e);
    return { status: 'error', message: '서버가 불안정 합니다.' };
  }
};

type TTmp = {};
export const getUserSubmission = async <T = any>(userId: number, cardPageId: number) => {
  try {
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: GET_USER_SUBMISSION_URL, body: { userId, cardPageId } });

    return {
      userSubmissionList: data.body.userSubmission as T extends never ? any : userSubmissionType<T>[],
      isSubmitted: data.body.isSubmitted,
      duration: data.body.duration,
      appropriateTime: data.body.appropriateTime,
      isCorrect: data.body.isCorrect,
      dflvSeCd: data.body.dflvSeCd,
      curriculumId: data.body.curriculumId,
      activeType: data.body.activeType,
      currentSeq: data.body.currentSeq,
      contentId: data.body.contentId,
      unitId: data.body.unitId,
    };
  } catch (e: unknown) {
    console.error('getUserSubmission Error:', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const postUserSubmission = async (requestBody: requestDataSavePageType) => {
  try {
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: POST_USER_SUBMISSION, body: requestBody });
    return data.body;
  } catch (e: unknown) {
    console.error('postUserSubmission Error:', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const postUserSave = async (requestBody: requestDataSavePageType) => {
  try {
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: POST_USER_SAVE_SUBMISSION, body: requestBody });
    return data.body;
  } catch (e: unknown) {
    console.error('postUserSave Error:', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const postUserSubmissionWithResult = async (requestBody: requestDataSavePageType) => {
  try {
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: POST_USER_SUBMISSION_WITH_RESULT, body: requestBody });

    return data.body;
  } catch (e: unknown) {
    console.error('postUserSubmissionWithResult Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const postUserLog = async (userId: number, cardPageId: number, accessType: userAccessLogType) => {
  try {
    const ws = new SuperAppWebsocket({
      reconnect: false,
      excludeServiceNames: ['제외할 서비스 명'],
    });

    ws.setUrl(env.SOCKET_URL);
    const data = await ws.serviceCall({ serviceName: POST_USER_LOG, body: { userId, cardPageId, accessType } });
    return data.body;
  } catch (e: unknown) {
    console.error('postUserLog Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};
