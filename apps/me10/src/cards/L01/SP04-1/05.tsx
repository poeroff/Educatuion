import ME11301, { ISentence } from '@maidt-cntn/pages/ME-113-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const sentence: ISentence[] = [
    {
      text: "be동사의 의문문은 be동사와 주어의 순서를 바꿔 be동사를 주어 앞에 써서 'be동사+주어 ~?'로 나타냅니다.",
    },
    {
      text: '긍정의 대답: Yes, 주어+be동사.',
    },
    {
      text: '부정의 대답: No, 주어+be동사+not.',
    },
  ];

  return <ME11301 headerInfo={headerInfo} title='be동사의 의문문' sentence={sentence} mainText='한눈에 정리하기' />;
};

export default P05;
