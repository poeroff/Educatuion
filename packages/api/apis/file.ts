import { SuperAppWebsocket } from '@wapl/superapp-websocket';
import { POST_SIGNED_URL_FOR_DOWNLOAD, POST_SIGNED_URL_FOR_UPLOAD, GET_CDN_ACCESS_TOKEN } from '../constants';
import axios from 'axios';

const FILE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const fws = new SuperAppWebsocket({
  reconnect: false,
  excludeServiceNames: ['제외할 서비스 명'],
});

fws.setUrl(FILE_SOCKET_URL);

export const postSignedUrlForDownload = async (subjectCode: string, fileName: string) => {
  try {
    const data = await fws.serviceCall({
      serviceName: POST_SIGNED_URL_FOR_DOWNLOAD,
      header: { targetServiceName: POST_SIGNED_URL_FOR_DOWNLOAD, messageType: 'REQUEST' },
      body: { subjectCode, fileName },
    });
    return data.body;
  } catch (e: unknown) {
    console.error('postSignedUrl Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const postSignedUrlForUpload = async (subjectCode: string, fileName: string) => {
  try {
    const data = await fws.serviceCall({
      serviceName: POST_SIGNED_URL_FOR_UPLOAD,
      header: { targetServiceName: POST_SIGNED_URL_FOR_UPLOAD, messageType: 'REQUEST' },
      body: { subjectCode, fileName },
    });
    return data.body;
  } catch (e: unknown) {
    console.error('postSignedUrlForUpload Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const putUpload = async (signedUrl: string, file: File) => {
  try {
    const data = await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      withCredentials: true,
    });
    return data;
  } catch (e: unknown) {
    console.error('putUpload Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const getFile = async (signedUrl: string) => {
  try {
    const data = await axios.get(signedUrl, {
      responseType: 'blob',
      withCredentials: true,
    });
    return data.data;
  } catch (e: unknown) {
    console.error('getFile Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};

export const getAccessToken = async (subjectCode: string) => {
  try {
    const data = await fws.serviceCall({
      serviceName: GET_CDN_ACCESS_TOKEN,
      header: { targetServiceName: GET_CDN_ACCESS_TOKEN, messageType: 'REQUEST' },
      body: { subjectCode: subjectCode.toUpperCase() },
    });
    return data.body;
  } catch (e: unknown) {
    console.error('getAccessToken Error', e);
    return {
      status: 'error',
      message: '서버가 불안정 합니다.',
    };
  }
};
