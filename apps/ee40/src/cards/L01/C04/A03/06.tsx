import EEL01C04A03P06 from '@/Pages/EEL01C04A03P06';
import { getDefaultData, getCorrectData } from './pageData';

const P06 = () => {
  const PageInfo = {
    subKey: 'TEXT-01',
    mainKey: 6,
    pageNumber: 6,
    headerText: 'Act Out',
    questionText: ' 역할놀이 후, 서로 칭찬해 봅시다.',
  };

  const questions: Array<string> = ['대사를 잘 전달했나요?', '자신 있게 연기했나요?', '즐겁게 참여했나요?', '배려하며 활동했나요?'];

  const personList = [
    {
      name: '나',
      scoreList: [0, 0, 0, 0],
    },
    {
      name: undefined,
      scoreList: [0, 0, 0, 0],
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

export default P06;
