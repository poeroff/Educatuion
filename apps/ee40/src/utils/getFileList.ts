import { handleDownload } from '@maidt-cntn/util/FileUtil';

export default async function getFileList(subject: string, fileName: string | string[] = '') {
  if (!subject) {
    return;
  }

  const fileNames = Array.isArray(fileName) ? fileName : [fileName];

  const urls = await Promise.all(
    fileNames.map(async name => {
      try {
        const content = await handleDownload(subject, name);
        if (content.status !== 'error') {
          return typeof content === 'string' ? content : URL.createObjectURL(content);
        } else {
          return '';
        }
      } catch (error) {
        return '';
      }
    }),
  );
  return urls;
}
