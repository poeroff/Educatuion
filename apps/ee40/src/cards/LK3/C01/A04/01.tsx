import EEL01C04A03P06 from '@/Pages/EEL01C04A03P06';
import { getDefaultData, getCorrectData } from './pageData';

const P01 = () => {
  const PageInfo = {
    subKey: 'TEXT-01',
    mainKey: 1,
    pageNumber: 1,
    headerText: 'Self Check',
    questionText: '활동 내용을 서로 칭찬해 봅시다.',
  };

  const questions: Array<string> = ['준비를 잘했나요?', '서로 도와주었나요?', '발표를 잘했나요?'];

  const personList = [
    {
      name: '나',
      scoreList: [0, 0, 0],
    },
    {
      name: undefined,
      scoreList: [0, 0, 0],
    },
  ];

  return (
    <EEL01C04A03P06
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
      pageInfo={PageInfo}
      questions={questions}
      personList={personList}
    />
  );
};

export default P01;
