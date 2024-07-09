import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hello, everyone.',
      translation: '안녕하세요, 여러분.',
    },
    {
      inLine: true,
      originText: 'This is your school president speaking.',
      translation: '저는 학교 회장입니다.',
    },
    {
      inLine: true,
      originText: 'Our school is planning to run a flea market next month.',
      translation: '우리 학교에서는 다음 달에 벼룩시장을 운영할 계획입니다.',
    },
    {
      inLine: true,
      originText:
        'If you have any items that you no longer use, such as books, clothes, or sporting goods, please feel free to bring them to the flea market.',
      translation: '책, 옷, 스포츠 용품 등 더 이상 사용하지 않는 물건이 있다면 벼룩시장에 가져와 주세요.',
    },
    {
      inLine: true,
      originText: 'Don’t you think it’s better to sell those things than to keep them around your house? ',
      translation: '집에 보관하는 것보다 판매하는 것이 더 낫지 않나요? ',
    },
    {
      inLine: true,
      originText: 'It’ll be a great opportunity to make a little extra money and find new owners for your used items.',
      translation: '중고 물품의 새 주인을 찾고 약간의 추가 수익도 얻을 수 있는 좋은 기회가 될 것입니다.',
    },
    {
      inLine: true,
      originText: 'To participate in the flea market, come to the student council room with your items to sign up by next Friday.',
      translation: '벼룩시장에 참여하려면 다음 주 금요일까지 물품을 가지고 학생회실로 오셔서 등록하세요.',
    },
    {
      inLine: true,
      originText: 'The council members will be waiting for you during the lunch hour every day next week.',
      translation: '학생회 임원들이 다음 주 매일 점심시간에 여러분을 기다릴 것입니다.',
    },
    {
      inLine: true,
      originText: 'Remember: you can bring anything except for food.',
      translation: '기억하세요: 음식을 제외한 모든 물품을 가져와도 됩니다.',
    },
    {
      inLine: true,
      originText: 'Thank you!',
      translation: '감사합니다!',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.srt',
  };

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
