import EEL11C03A10P03 from '@/Pages/EEL11C03A10P03 ';
import { getCorrectData, getDefaultData } from './pageData';

interface Props {
  userId: number;
}

const P03 = (userId: Props) => {
  const exampleAnswer = getCorrectData(3)[0].inputDatas[0][0].value;

  const pageInfo = {
    mainKey: 3,
    subKey: 'RECORDER-1',
    headerText: 'Mission 3_ Try It',
    pageNum: 3,
    questionText: '금지하는 표지판을 찾아 사진을 찍어 올리고, 금지하는 말을 해 봅시다.',
  };

  const FileInfo = {
    subjectCode: 'EE40',
    path: 'L04/C03/A10',
    id: userId.userId,
  };
  const contentInfo = {
    text: '금지하는 말',
  };

  return (
    <EEL11C03A10P03
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
