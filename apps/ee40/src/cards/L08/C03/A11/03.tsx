import EEL10C03A10P03 from '@/Pages/EEL10C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

interface Props {
  userId: number;
}

const P03 = (userId: Props) => {
  const exampleAnswer = getCorrectData(3)[0].inputDatas[0][0].value;

  const pageInfo = {
    mainKey: 3,
    subKey: 'TEXT-01',
    headerText: 'Mission 3_Try It',
    pageNum: 3,
    questionText: '오늘 배운 낱말을 골라 쓰고, 그 물건을 상점에서 찾아 사진을 찍어 올려 봅시다.',
  };

  const FileInfo = {
    subjectCode: 'EE40',
    path: 'L08/C03/A11',
    id: userId.userId,
  };

  return (
    <EEL10C03A10P03 pageInfo={pageInfo} getCorrectData={getCorrectData} getDefaultData={getDefaultData} answer={exampleAnswer} fileInfo={FileInfo} />
  );
};

export default P03;
