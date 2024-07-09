//Page: EE4-L03-C03-A10-P03

import EEL03C02A08P03 from '@/Pages/EEL03C02A08P03';
import { getCorrectData, getDefaultData } from './pageData';

interface Props {
  userId: number;
}

const P03 = (userId: Props) => {
  const exampleAnswer = getCorrectData(3)[0].inputDatas[0][0].value;

  const pageInfo = {
    mainKey: 3,
    subKey: 'RECORDER-1',
    headerText: 'Mission 2_ Try It',
    pageNum: 3,
    questionText: '친구나 가족 한 명의 사진을 올리고, 그 사람을 묘사해 봅시다.',
  };

  const FileInfo = {
    subjectCode: 'EE40',
    path: 'L03/C02/A08',
    id: userId.userId,
  };
  const contentInfo = {
    text: '묘사하는 말',
  };

  return (
    <EEL03C02A08P03
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      answer={exampleAnswer}
      fileInfo={FileInfo}
      dataKey={{ mainKey: 3, subKey: 'RECORDER-1' }}
      contentInfo={contentInfo}
    />
  );
};

export default P03;
