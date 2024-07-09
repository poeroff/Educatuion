//Page: EE4-L03-C03-A10-P03

import EEL03C03A10P03 from '@/Pages/EEL03C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

interface Props {
  userId: number;
}

const P03 = (userId: Props) => {
  const exampleAnswer = getCorrectData(3)[0].inputDatas[0][0].value;

  const pageInfo = {
    mainKey: 3,
    subKey: 'RECORDER-1',
    headerText: 'Mission 3_Try It',
    pageNum: 3,
    questionText: '알파벳을 하나씩 찾아 사진으로 찍어 ‘teacher’를 만들어 사진을 찍어 올리고, 낱말을 말해 봅시다.',
  };

  const FileInfo = {
    subjectCode: 'EE40',
    path: 'L03/C03/A10',
    id: userId.userId,
  };

  return (
    <EEL03C03A10P03
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      answer={exampleAnswer}
      fileInfo={FileInfo}

    />
  );
};

export default P03;
