//Page: EE4-L02-C01-A09-P03

import EEL03C03A10P03 from '@/Pages/EEL03C03A10P03';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';

interface Props {
  userId: number;
}

const P03 = (userId: Props) => {
  const exampleAnswer = getCorrectData(3)[0].inputDatas[0][0].value;

  const pageInfo = {
    mainKey: 3,
    subKey: 'RECORDER-1',
    headerText: 'Mission 1_Try It',
    pageNum: 3,
    questionText: '가족 중 한 명의 사진을 올리고, 담임 선생님께 가족을 소개해 봅시다.',
  };

  const FileInfo = {
    subjectCode: 'EE40',
    path: 'L02/C01/A09',
    id: userId.userId,
  };

  return (
    <EEL03C03A10P03
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      getSolutionData={getSolutionData}
      answer={exampleAnswer}
      fileInfo={FileInfo}

    />
  );
};

export default P03;