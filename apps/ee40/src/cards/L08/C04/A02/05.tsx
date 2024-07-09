import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import EEL01C03A10P02 from '@/Pages/EEL01C03A10P02';
import useFile from '@/utils/fileDownLoad';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Class Theater',
  };

  const questionText = '포그가 새로 산 배는 얼마였나요?';

  const data = [
    {
      text: '70 달러 였어요.',
    },
    {
      text: '700 달러 였어요.',
    },
    {
      text: '7000 달러 였어요.',
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
    src: '/L08/C04/A02/EE4-L08-C04-A02-P05.png',
    width: '480px',
    height: '360px',
    alt: '항구에서 세 사람이 나란히 서 있다. 세 사람 뒤로는 푸른 바다 위에 나무로 만들어진 돛단배가 있다.왼쪽에 있는 사람은 수염이 있고 선원 복장을 하고 있다. 가운데 있는 사람은  손가락으로 배를 가리키며 ＂I want this boat.＂라고 말하고 있다.오른쪽에 있는 사람은 흰색 셔츠와 갈색 바지를 입고 있고 놀란 표정을 짓고 있다.',
    title:
      '항구에서 세 사람이 나란히 서 있다. 세 사람 뒤로는 푸른 바다 위에 나무로 만들어진 돛단배가 있다.왼쪽에 있는 사람은 수염이 있고 선원 복장을 하고 있다. 가운데 있는 사람은  손가락으로 배를 가리키며 ＂I want this boat.＂라고 말하고 있다.오른쪽에 있는 사람은 흰색 셔츠와 갈색 바지를 입고 있고 놀란 표정을 짓고 있다.',
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
