import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Then and Now (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Minjun is using his tablet and writing a rap song.',
      translation: '민준이는 자신의 태블릿을 이용하여 랩 노래를 쓰고 있어요.',
    },
    {
      originText: 'Later, he shares the song on social media.',
      translation: '후에, 그는 그 노래를 소셜 미디어에 공유해요.',
    },
    {
      originText: 'He gets “likes” from people around the world.',
      translation: '그는 전 세계 사람들로부터 “좋아요”를 받아요.',
    },
    {
      originText: 'Minjun checks his DMs before bedtime.',
      translation: '민준이는 자기 전에 DM을 확인해요.',
    },
    {
      originText: 'One message says, “U R AMAZING!”',
      translation: '한 메시지에는 “너는 굉장해!”라고 쓰여 있어요.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
