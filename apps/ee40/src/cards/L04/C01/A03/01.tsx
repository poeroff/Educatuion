import EE40L01C01A03P01 from '@/Pages/EEL01C01A03P01';
import { getDefaultData, getCorrectData } from './pageData';

const P01 = () => {
  const PageInfo = {
    headerText: 'My Plan',
    mainKey: 1,
    subKey: 'TEXT-01',
    pageNum: 1,
  };

  const list = ['금지하기', '지시하기', 'egg의 e 소리 익히기', '나의 계획쓰기'];

  const exampleAnswer = getCorrectData(1)[0].inputDatas[0][0].value;

  return <EE40L01C01A03P01 pageInfo={PageInfo} getDefaultData={getDefaultData} getCorrectData={getCorrectData} list={list} answer={exampleAnswer} />;
};

export default P01;
