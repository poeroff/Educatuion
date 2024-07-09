import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import EEL01C03A10P02 from '@/Pages/EEL01C03A10P02';
import useFile from '@/utils/fileDownLoad';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Mission 3_Quiz 2',
  };

  const questionText = '그림을 보고, 알맞은 낱말을 골라 봅시다.';

  const data = [
    {
      text: 'glove',
    },
    {
      text: 'watch',
    },
    {
      text: 'umbrella',
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
    src: '/L08/C03/A11/EE4-L08-C03-A11-P02.png',
    width: '480px',
    height: '360px',
    alt: '야구 글러브',
    title: '야구 글러브',
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
