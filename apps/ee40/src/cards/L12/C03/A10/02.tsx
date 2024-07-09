import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import EEL01C03A10P02 from '@/Pages/EEL01C03A10P02';
import useFile from '@/utils/fileDownLoad';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Mission 2_Quiz 2',
  };

  const questionText = '그림을 보고, 알맞은 어구를 골라 봅시다.';

  const data = [
    {
      text: 'play the piano',
    },
    {
      text: 'ride my bike',
    },
    {
      text: 'walk my dog',
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
    src: '/L12/C03/A10/EE4-L12-C03-A10-P02.png',
    width: '480px',
    height: '360px',
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
