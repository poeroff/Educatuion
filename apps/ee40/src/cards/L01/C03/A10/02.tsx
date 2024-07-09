import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import EEL01C03A10P02 from '@/Pages/EEL01C03A10P02';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Mission 3_Quiz 2',
  };

  const questionText = '그림을 보고, 알맞은 낱말을 골라 봅시다.';

  const data = [
    {
      text: 'morning',
    },
    {
      text: 'afternoon',
    },
    {
      text: 'evening',
    },
  ];

  const pageData = {
    mainKey: 2,
    subKey: 'NUMBER-0',
    pageNumber: 2,
  };

  const solutionInfo = [
    {
      label: '답안',
      value: getCorrectData(2)[0].inputDatas[0][0].value,
    },
    {
      label: '해설',
      value: JSON.stringify(getSolutionData(2)[0].text),
    },
  ];

  const imgInfo = {
    src: '/L01/C03/A10/EE4-L01-C03-A10-P02.JPG',
    width: '400px',
    height: 'auto',
    alt: '해가 산 너머로 지고 있는 풍경',
    title: '해가 산 너머로 지고 있는 풍경',
  };

  return (
    <EEL01C03A10P02
      headerInfo={headerInfo}
      questionText={questionText}
      data={data}
      imgInfo={imgInfo}
      pageData={pageData}
      solutionInfo={solutionInfo}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default P02;
