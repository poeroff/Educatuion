import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { getDefaultData, getCorrectData, getSolutionData } from './pageData';
import EEL01C03A10P02 from '@/Pages/EEL01C03A10P02';
import useFile from '@/utils/fileDownLoad';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Class Theater',
  };

  const questionText = '엄마는 청개구리에게 어떤 행동을 하지 말라고 했나요?';

  const data = [
    {
      text: '뛰지 말라고 했어요.',
    },
    {
      text: '수영을 하지 말라고 했어요.',
    },
    {
      text: '창문을 열지 말라고 했어요.',
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
    src: '/L04/C04/A02/EE4-L04-C04-A02-P05.png',
    width: '480px',
    height: '360px',
    alt: '두 마리의 개구리가 실내에서 대화를 나누고 있는 모습 왼쪽에 있는 작은 청개구리는 빨간색 의자에 앉아 있으며, 웃는 얼굴을 하고 있다. 이 개구리는 물에서 헤엄치는 모습을 상상하고 있다. 오른쪽에 있는 큰 개구리는 녹색 드레스를 입고 파란색 의자에 앉아 있으며, 한 손에는 컵을 들고 있다. 이 개구리는 작은 개구리를 바라보며 대화를 나누는 듯한 표정을 하고 있다. 배경에는 창문이 있고 창 밖에는 비가 내리고 있다.',
    title:
      '두 마리의 개구리가 실내에서 대화를 나누고 있는 모습 왼쪽에 있는 작은 청개구리는 빨간색 의자에 앉아 있으며, 웃는 얼굴을 하고 있다. 이 개구리는 물에서 헤엄치는 모습을 상상하고 있다. 오른쪽에 있는 큰 개구리는 녹색 드레스를 입고 파란색 의자에 앉아 있으며, 한 손에는 컵을 들고 있다. 이 개구리는 작은 개구리를 바라보며 대화를 나누는 듯한 표정을 하고 있다. 배경에는 창문이 있고 창 밖에는 비가 내리고 있다.',
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
