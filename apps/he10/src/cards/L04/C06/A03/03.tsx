import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (1)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'The famous German musician Johann Sebastian Bach once said, "Without my morning coffee, I\'m just like a dried-up piece of goat."',
      translation: '독일의 유명한 음악가 요한 세바스티안 바흐는 "모닝 커피가 없으면 나는 말린 염소 고기 조각과 같다"고 말했습니다.',
    },
    {
      originText:
        'Today this sentiment is shared by many, with coffee shops springing up on almost every street corner, and it is common to see city residents walking around with a cup of coffee in hand.',
      translation:
        '오늘날 이러한 정서는 많은 사람들이 공유하고 있으며, 거의 모든 길모퉁이에 커피숍이 생겨나고, 도시민들이 손에 커피 한잔을 들고 돌아다니는 모습을 흔히 볼 수 있습니다.',
    },
    {
      originText:
        'According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee.',
      translation:
        '국제커피기구(ICO)에 따르면 2020년부터 2021년까지 전 세계적으로 약 100억 톤의 커피가 소비되었으며, 한국인은 150,780톤의 커피를 소비하여 이 엄청난 양에 상당한 기여를 했습니다.',
    },
    {
      originText: 'This means that every Korean adult drank an average of one cup of coffee every day throughout the year.',
      translation: '이는 한국 성인 1명이 일년 내내 매일 평균 한 잔의 커피를 마셨다는 것을 의미합니다.',
    },
    {
      originText: 'Clearly, for Koreans and other world citizens, coffee is not just a drink but a daily necessity.',
      translation: '분명 한국인을 비롯한 세계인들에게 커피는 단순한 음료가 아닌 생활필수품입니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
