import ME11301, { ISentence } from '@maidt-cntn/pages/ME-113-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const sentence: ISentence[] = [
    {
      text: "be동사는 '~이다, ~이 있다'의 의미입니다. 주어에 따라 am, are, is 중 알맞은 것을 씁니다.",
    },
    {
      text: '주어+be동사: I am / you are / he is / she is / it is / we are / they are',
    },
    {
      text: '주어+be동사의 축약형: I’m / you’re / he’s / she’s / it’s / we’re / they’re',
    },
  ];

  return (
    <ME11301
      headerInfo={headerInfo}
      title='be동사의 의미와 형태'
      sentence={sentence}
      mainText='한눈에 정리하기'
      subText='am/are/is ~이다. ~이 있다.'
    />
  );
};

export default P01;
