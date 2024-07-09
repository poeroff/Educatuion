import { getFile, postSignedUrlForDownload, postSignedUrlForUpload, putUpload } from '../api/apis/file';

export type TSubjectCode = 'HE10' | 'HE20' | 'EM31' | 'ME10';

export const extractToken = (str: string) => {
  const match = str.match(/^token=(.*)$/);
  return match ? match[1] : '';
};

const getSignedUrlForDownload = async (subjectCode: string, fileName: string) => {
  const response1 = await postSignedUrlForDownload(subjectCode, fileName);
  const { signedUrl } = response1;
  const [_, token] = signedUrl?.split('?');
  const value = extractToken(token);
  return [signedUrl, value];
};

const getSignedUrlForUpload = async (subjectCode: string, fileName: string) => {
  const response1 = await postSignedUrlForUpload(subjectCode, fileName);
  const { signedUrl } = response1;
  const [_, token] = signedUrl.split('?');
  const value = extractToken(token);
  return [signedUrl, value];
};

export const handleDownload = async (subjectCode: string, fileName: string) => {
  const [signedUrl] = await getSignedUrlForDownload(subjectCode, fileName);
  const fileData = await getFile(signedUrl);
  return fileData;
}; // BLOB 데이터를 반환합니다.

/**
 *
 * @param file 업로드할 File
 * @param subjectCode 교과 코드 : HE10, HE20, EM31
 * @param path 업로드 경로 L01/C02/A03
 * @param userId 학생 ID
 * @param fileName 파일명 (확장자 포함)
 * @returns 정상 업로드시 true/ 에러 발생시 false
 */
export const handleUpload = async (file: File | null, subjectCode: string, path: string, userId: number, fileName: string) => {
  if (file) {
    try {
      const objectName = `${path}/student/${userId}/${fileName}`;
      const [signedUrl] = await getSignedUrlForUpload(subjectCode, objectName);
      await putUpload(signedUrl, file);
      return true;
    } catch (error) {
      return false;
    }
  } else return false;
};
/**
 *
 * @param file 업로드할 File
 * @param subjectCode 교과 코드 : HE10, HE20, EM31, ME10
 * @param filePath 파일 경로까지 포함한 Path L01/A02/C03/1111/P1-IMG-1.wav
 * @returns 정상 업로드시 true/ 에러 발생시 false
 */
export const handleUploadByPath = async (file: File | null, subjectCode: TSubjectCode, filePath: string) => {
  if (file) {
    try {
      const [signedUrl] = await getSignedUrlForUpload(subjectCode, filePath);
      await putUpload(signedUrl, file);
      return true;
    } catch (error) {
      return false;
    }
  } else return false;
};

/**
 *
 * @param cardPath 카드 Path L01/C02/A02
 * @param fileType audio or image
 * @param index 파일의 index
 * @param page P01 P02 P03
 * @param userId 학생 ID
 * @returns 파일의 확장자 까지 포함한 full path
 */
export const makeFilePath = ({
  cardPath,
  fileType,
  index,
  page,
  userId,
}: {
  cardPath: string;
  page: string;
  userId: number;
  fileType: 'audio' | 'image';
  index: number;
}) => {
  return `${cardPath}/students/${userId}/${page}-${fileType === 'image' ? 'IMG' : fileType === 'audio' ? 'AUDIO' : ''}-${index}`;
};

const readFileAsText = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsText(file);
  });
};

/**
 *
 * @param subjectCode 교과 코드 : HE10, HE20, EM31, ...
 * @param path 파일 경로까지 포함한 Path L01/C05/A02/HE1-L01-C05-A02.srt
 * @returns srt 파일의 string contents
 */
export const getSrtContents = async (subjectCode: string, path: string): Promise<string> => {
  const file = await handleDownload(subjectCode, path);
  if (file) {
    return (await readFileAsText(file)) as string;
  } else {
    return '';
  }
};

/**
 *
 * @param path 파일 경로까지 포함한 Path L01/C05/A02/HE1-L01-C05-A02.srt
 * @param token CDN에 접근하기 위한 accessToken st=1718186909~exp=~~~
 * @returns accessToken 값이 queryString으로 포함된 대상 경로
 */
export const getFileFromCDNWithToken = (path: string, token: string) => {
  if (token) {
    return path.concat('?token=').concat(token);
  } else {
    return path;
  }
};

/**
 * 
 * @param url 유효성 검사할 URL
 * @returns 정상 URL이면 true, 아니면 false
 */
export const isUrlValid = (url: string) => {
  try {
    new URL(url);
  } catch {
    return false;
  }
  return true;
};
