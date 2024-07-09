import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import { useRef, useState } from 'react';
import ChatBubble from '@/components/ChatBubble';

const P01 = () => {
  const [clicked, setClicked] = useState(false);

  const tooltipRef = useRef<HTMLButtonElement>(null);

  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <Line leftPadding style={{ marginTop: '30px' }}>
        <Text>
          함께하기에서 <span>24</span>를 어떤 순서로 소인수분해 해도 그 결과는&nbsp;
        </Text>
        <ExplanationText onClick={() => setClicked(prev => !prev)}>
          <Text>
            <span>2³×3&nbsp;</span>
          </Text>
          <ToopTipIcon ref={tooltipRef} />
        </ExplanationText>
        <Text>&nbsp;&nbsp;으로 모두 같음을 알</Text>
      </Line>

      <Line>
        <Text>수 있다.</Text>
      </Line>

      <Line leftPadding>
        <Text>일반적으로 어떤 자연수를 소인수분해 한 결과는 곱하는 순서를 생각하지 않으면 오직 한</Text>
      </Line>

      <Line>
        <Text>가지뿐이다.</Text>
      </Line>

      {clicked && (
        <ChatBubble
          iconRef={tooltipRef}
          direction='top'
          text='소인수분해 한 결과는 보통 크기가 작은 소인수부터 차례대로 쓰고, 같은 소인수의 곱은 거듭제곱으로 나타낸다.'
          onClickClose={() => setClicked(false)}
        />
      )}
    </Container>
  );
};

export default P01;

const Line = styled.div<{ leftPadding?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;

  padding-left: ${props => (props.leftPadding ? '20px' : 0)};
`;

const ExplanationText = styled.button`
  display: flex;
  align-items: center;
  position: relative;

  margin-right: 4px;
`;

const Text = styled.p`
  font-family: SUIT;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);
  white-space: nowrap;

  span {
    font-family: NOTO;
  }

  strong {
    color: rgba(106, 109, 115, 1);
  }
`;

const ToopTipIcon = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-pink-500);
  transform: translateY(-4px);
  cursor: pointer;
`;
