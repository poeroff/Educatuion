import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'At night, Jihun is listening to his favorite radio show.',
      translation: '밤에, 지훈이는 자신이 가장 좋아하는 라디오 프로그램을 듣고 있어요.',
    },
    {
      originText: 'He records songs from the radio on a tape.',
      translation: '그는 라디오에서 나오는 노래를 테이프에 녹음해요.',
    },
    {
      originText: 'There are many great songs on the tape.',
      translation: '테이프에는 좋은 노래가 많이 있어요.',
    },
    {
      originText: 'Sometimes, he writes a letter to the DJ and requests a song.',
      translation: '때때로, 그는 디제이에게 편지를 쓰고 노래를 신청해요.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
