import ME11301, { ISentence } from '@maidt-cntn/pages/ME-113-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const sentence: ISentence[] = [
    {
      text: 'be동사 뒤에 not을 붙여 나타냅니다. are not과 is not은 각각 aren’t와 isn’t로 축약하여 쓸 수 있습니다. 단, am not은 보통 축약해서 쓰지 않습니다.',
    },
  ];

  return <ME11301 headerInfo={headerInfo} title='be동사의 부정문' sentence={sentence} mainText='한눈에 정리하기' />;
};

export default P03;
