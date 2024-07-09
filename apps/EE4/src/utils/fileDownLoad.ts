import getFileList from '@/utils/getFileList';
import { useLayoutEffect, useState } from 'react';

function useFile(subject: string, fileName: string | string[]) {
  const [files, setFiles] = useState<string | string[]>('');
  const getFilesAPI = async () => {
    const imgFileList = await getFileList(subject, fileName);
    imgFileList && setFiles(imgFileList);
  };

  useLayoutEffect(() => {
    getFilesAPI();
  }, []);

  return files;
}

export default useFile;
