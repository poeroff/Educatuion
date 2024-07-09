import ME11301, { ISentence } from '@maidt-cntn/pages/ME-113-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const sentence: ISentence[] = [
    {
      text: "'주어+do not+일반동사'로 쓰며, 주어가 3인칭 단수일 때는 does not	을 씁니다. 이때 일반동사는 모두 동사원형으로 씁니다. do not은 	don’t로, does not은 doesn’t로 축약할 수 있습니다.",
    },
  ];

  return <ME11301 headerInfo={headerInfo} title='일반동사의 부정문' sentence={sentence} mainText='한눈에 정리하기' />;
};

export default P09;
