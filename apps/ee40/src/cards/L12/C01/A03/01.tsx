// Page: EE4-L12-C01-A03

import EE40L01C01A03P01 from '@/Pages/EEL01C01A03P01';
import { getDefaultData, getCorrectData } from './pageData';

const P01 = () => {
  const PageInfo = {
    headerText: 'My Plan',
    mainKey: 1,
    subKey: 'TEXT-01',
    pageNum: 1,
  };

  const list = ['주말 여가 활동 묻고 답하기', '상대방 의견 묻기', 'thank의 th 소리 익히기', '나의 계획 쓰기'];

  const exampleAnswer = getCorrectData(1)[0].inputDatas[0][0].value;

  return <EE40L01C01A03P01 pageInfo={PageInfo} getDefaultData={getDefaultData} getCorrectData={getCorrectData} list={list} answer={exampleAnswer} />;
};

export default P01;
