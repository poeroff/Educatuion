import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import EEL01C03A10P02 from '@/Pages/EEL01C03A10P02';
import useFile from '@/utils/fileDownLoad';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Class Theater',
  };

  const questionText = '아빠의 가방은 어디에 있었나요?';

  const data = [
    {
      text: '식탁 위에 있었어요.',
    },
    {
      text: '상자 안에 있었어요.',
    },
    {
      text: '의자 아래에 있었어요.',
    },
  ];

  const pageData = {
    mainKey: 5,
    subKey: 'NUMBER-0',
    pageNumber: 5,
  };

  const solutionInfo = [
    {
      label: '답안',
      value: getCorrectData(5)[0].inputDatas[0][0].value,
    },
  ];

  const imgInfo = {
    src: '/L09/C04/A02/EE4-L09-C04-A02-P05.png',
    width: '480px',
    height: '360px',
    alt: '네 명의 인물이 그려져 있다.남자 아이가 무언가를 가리키면서 말하고 있다.여자는 국자와 녹색 셔츠를 들고 있다.남자는 서류 가방을 찾으며 놀란 표정을 짓고 있다.또 다른 남자 아이는 책을 찾으며 큰 소리로 말하고 있다.',
    title:
      '네 명의 인물이 그려져 있다.남자 아이가 무언가를 가리키면서 말하고 있다.여자는 국자와 녹색 셔츠를 들고 있다.남자는 서류 가방을 찾으며 놀란 표정을 짓고 있다.또 다른 남자 아이는 책을 찾으며 큰 소리로 말하고 있다.',
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

export default P05;
