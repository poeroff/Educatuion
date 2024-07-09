import { handleDownload } from '@maidt-cntn/util/FileUtil';

export default async function renderFiles(subject: string, fileName: string | string[] = '') {
  if (!subject) {
    return;
  }

  const fileNames = Array.isArray(fileName) ? fileName : [fileName];

  const urls = await Promise.all(
    fileNames.map(async name => {
      const content = await handleDownload(subject, name);
      return URL.createObjectURL(content);
    }),
  );

  console.log(urls);

  return urls;
}
