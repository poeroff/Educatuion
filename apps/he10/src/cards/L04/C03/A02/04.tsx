import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C03/A02/HE1-L04-C03-A02-02.mp3',
  captionSrc: '/L03/C03/A02/HE1-L04-C03-A02-02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Do you need to throw away your old large home appliances like refrigerators, air conditioners, TVs, and more?',
    translation: '냉장고, 에어컨, TV 등 오래된 대형 가전제품을 버리셔야 하나요?',
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Why don’t you try our service, Waste Collection King?',
    translation: '저희 서비스인 Waste Collection King을 이용해 보시는 건 어떨까요?',
    inLine: true,
  },
  {
    originText: 'It’s free and easy to use.',
    translation: '무료이며 이용하기 쉽습니다.',
    inLine: true,
  },
  {
    originText: 'Just visit our website and choose your preferred pick-up date.',
    translation: '저희 웹사이트에 방문하셔서 원하는 수거 날짜를 선택하기만 하면 됩니다.',
    inLine: true,
  },
  {
    originText: 'We’ll confirm the date of our visit and then come to your home and pick up your unwanted appliances.',
    translation: '저희가 방문 날짜를 확인한 후 집으로 방문하여 필요 없는 가전제품을 수거합니다.',
    inLine: true,
  },
  {
    originText: 'The appliances we pick up are taken to recycling centers where they’re properly disposed of.',
    translation: '저희가 수거한 가전제품은 재활용 센터로 가져가서 적절하게 폐기합니다.',
    inLine: true,
  },
  {
    originText: 'By taking advantage of our service, you can also do your part for the environment.',
    translation: '이 서비스를 이용하면 환경 보호에도 동참할 수 있습니다.',
    inLine: true,
  },
  {
    originText: 'For more information, please visit our website at www.wastecollectionking.com.',
    translation: '자세한 내용을 원하시면, 저희 웹사이트 www.wastecollectionking.com를 방문해 주세요.',
    inLine: true,
  },
];

const P04 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
