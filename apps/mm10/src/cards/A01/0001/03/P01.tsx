import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import ChatBubble from '@/components/A01/0001/03/ChatBubble';
import HiddenTextButton from '@/components/A01/0001/03/HiddenTextButton';
import { useState, useRef } from 'react';
import { Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const [clicked, setClicked] = useState(false);

  const tooltipRef = useRef<HTMLButtonElement>(null);

  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <Typography useGap={false} style={{ paddingTop: '20px' }}>
        <TextLineWrapper style={{ textIndent: '20px' }}>
          <span style={{ color: 'var(--color-grey-700)' }}>생각열기</span>
          <span>
            에서 <span style={{ fontFamily: 'NOTO' }}>6</span>의 약수는
          </span>
          <HiddenTextButton
            boxWidth={120}
            boxHeight={40}
            content='1, 2, 3, 6'
            textStyle={{
              'font-family': 'NOTO',
              'font-size': '28px',
              'font-weight': '400',
              'line-height': '42px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <span>이지만 <span style={{ fontFamily: 'NOTO' }}>7</span>의 약수는</span>
          <HiddenTextButton
            boxWidth={75}
            boxHeight={40}
            content='1, 7'
            textStyle={{
              'font-family': 'NOTO',
              'font-size': '28px',
              'font-weight': '400',
              'line-height': '42px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <span>이다.</span>
        </TextLineWrapper>
        <TextLineWrapper>
          <span>이와 같이 1보다 큰 자연수 중에서 1과 자기 자신만을 약수로 갖는 수를 </span>
          <ExplanationText>
            <Strong>소수</Strong>
            <ToolTipIcon ref={tooltipRef} onClick={() => setClicked(prev => !prev)} />
            {clicked && (
              <ChatBubble
                text='0.2나 0.04와 같은 소수는 한자로 小數이고, 2,3,5와 같은 소수는 한자로 素數이다.'
                direction='top'
                onClickClose={() => setClicked(false)}
              />
            )}
          </ExplanationText>
          <span>라고 한다.</span>
        </TextLineWrapper>
        <TextLineWrapper style={{ textIndent: '20px' }}>
          <span>또 1보다 큰 자연수 중에서 소수가 아닌 수를 </span>
          <Strong>합성수</Strong>
          <span>라고 한다.</span>
        </TextLineWrapper>
        <TextLineWrapper>한편, 1은 소수도 아니고 합성수도 아니다.</TextLineWrapper>
      </Typography>
    </Container>
  );
};

export default P01;

const TextLineWrapper = styled.div`
  padding-bottom: 20px;
  line-height: 44px;
  button {
    display: inline-block;
  }
`;

const ToolTipIcon = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-pink-500);
  transform: translateY(-18px);
  cursor: pointer;
`;

const ExplanationText = styled.button`
  position: relative;

  margin-right: 4px;
`;

const Strong = styled.span`
  color: var(--color-yellow-700);
  font-weight: var(--font-weight-extraBold);
`;
