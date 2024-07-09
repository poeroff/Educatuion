import ME11301, { ISentence } from '@maidt-cntn/pages/ME-113-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
const P11 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };
  const sentence: ISentence[] = [
    {
      text: "'Do+주어+일반동사 ~?'로 쓰며, 주어가 3인칭 단수일 때는 ‘Does+주어+일반동사 ~?’를 씁니다. 이때 일반동사는 모두 동사원형으로 씁니다.",
    },
    {
      text: '긍정의 대답: Yes, 주어+do[does].',
    },
    {
      text: '부정의 대답: No, 주어+don’t[doesn’t].',
    },
  ];

  return <ME11301 headerInfo={headerInfo} title='일반동사의 의문문' sentence={sentence} mainText='한눈에 정리하기' />;
};

export default P11;
