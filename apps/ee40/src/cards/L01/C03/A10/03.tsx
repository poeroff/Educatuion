import EEL01C03A10P03 from '@/Pages/EEL01C03A10P03';
import { getCorrectData, getDefaultData } from './pageData';

interface Props {
  userId: number;
}

const P03 = (userId: Props) => {
  // const subjectCode = 'EE40';
  // const path = 'L01/C03/A10';
  // const id = userId.userId;
  // const serverFileName = imgName;

  const exampleAnswer = getCorrectData(3)[0].inputDatas[0][0].value;

  const pageInfo = {
    mainKey: 3,
    subKey: 'TEXT-01',
    headerText: 'Mission 3_Try It',
    pageNum: 3,
    questionText: '때를 나타내는 낱말을 검색하여 나오는 사진을 공유하고, 어떤 때를 나타내는 것인지 낱말을 써 봅시다.',
  };

  const FileInfo = {
    subjectCode: 'EE40',
    path: 'L01/C03/A10',
    id: userId.userId,
  };

  return (
    <EEL01C03A10P03 pageInfo={pageInfo} getCorrectData={getCorrectData} getDefaultData={getDefaultData} answer={exampleAnswer} fileInfo={FileInfo} />
  );
};

export default P03;
