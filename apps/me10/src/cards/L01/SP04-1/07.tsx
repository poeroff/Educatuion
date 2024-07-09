import styled from '@emotion/styled';
import ME11301, { ISentence } from '@maidt-cntn/pages/ME-113-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '주요 내용 이해하기',
  };

  const sentence: ISentence[] = [
    {
      text: '일반동사는 주어가 3인칭 단수(he/she/it, 사람 이름(Amy, John 등)등)	이며 현재시제일 때 동사원형에 -(e)s를 붙입니다.',
    },
    {
      text: (
        <>
          <p>대부분의 동사 뒤에는 -s를 붙입니다.</p>
          <p>
            ex) like - like<BoldText>s</BoldText> / love - love<BoldText>s</BoldText> / eat - eat<BoldText>s</BoldText> / run - run
            <BoldText>s</BoldText>
          </p>
        </>
      ),
    },
    {
      text: (
        <>
          <p>-o, -s, -ch, -sh, -x로 끝나는 동사 뒤에는 -es를 붙입니다.</p>
          <p>
            ex) do - do<BoldText>es</BoldText> / teach - teach<BoldText>es</BoldText> / miss - miss<BoldText>es</BoldText> / wash - wash
            <BoldText>es</BoldText>
          </p>
        </>
      ),
    },
    {
      text: (
        <>
          <p>'자음+y'로 끝나는 동사는 y를 i로 바꾸고 뒤에 -es를 붙입니다. </p>
          <p>
            ex) try - tr<BoldText>ies</BoldText> / study - stud<BoldText>ies</BoldText> / fly - fl<BoldText>ies</BoldText>
          </p>
        </>
      ),
    },
  ];

  return (
    <ME11301 headerInfo={headerInfo} title='일반동사의 형태' sentence={sentence} mainText='한눈에 정리하기' subText='현재 동작, 상태 표현하기' />
  );
};

export default P07;

const BoldText = styled.span`
  font-weight: var(--font-weight-extraBold);
`;
