import styled from 'styled-components';
import { useRef, useState } from 'react';
import ChatBubble from '@/components/ChatBubble';
import HiddenTextButton from '@/components/HiddenTextButton';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const [clicked, setClicked] = useState(false);

  const tooltipRef = useRef<HTMLButtonElement>(null);

  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <Line leftPadding style={{ marginTop: '30px' }}>
        <Text>
          <span>12</span>의&nbsp;
        </Text>
        <ExplanationText>
          <Text>약수&nbsp;</Text>
          <ToopTipIcon ref={tooltipRef} onClick={() => setClicked(prev => !prev)} />
          <Text>&nbsp;&nbsp;는</Text>
        </ExplanationText>
        <Text>
          <span>1, 2, 3, 4, 6, 12</span>이고, 이 중에서 소수인 것은{' '}
        </Text>
        <HiddenTextButton
          boxWidth={75}
          boxHeight={40}
          content='2'
          textStyle={{
            'font-family': 'NOTO',
            'font-size': '28px',
            'font-weight': '400',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>와</Text>
        <HiddenTextButton
          boxWidth={75}
          boxHeight={40}
          content='3'
          textStyle={{
            'font-family': 'NOTO',
            'font-size': '28px',
            'font-weight': '400',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>이다.</Text>
      </Line>

      <Line>
        <Text>
          이와 같이 어떤 자연수의 약수 중에서 소수인 것을 그 자연수의 <strong>소인수</strong>라고 한다.
        </Text>
      </Line>

      <Line leftPadding>
        <Text>
          예를 들어 <span>12</span>의 소인수는{' '}
        </Text>
        <HiddenTextButton
          boxWidth={75}
          boxHeight={40}
          content='2'
          textStyle={{
            'font-family': 'NOTO',
            'font-size': '28px',
            'font-weight': '400',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>와</Text>
        <HiddenTextButton
          boxWidth={75}
          boxHeight={40}
          content='3'
          textStyle={{
            'font-family': 'NOTO',
            'font-size': '28px',
            'font-weight': '400',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>이다.</Text>
      </Line>

      {clicked && <ChatBubble iconRef={tooltipRef} text='약수를 인수라고도 한다.' direction='top' onClickClose={() => setClicked(false)} />}
    </Container>
  );
};

export default P01;

const Line = styled.div<{ leftPadding?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;

  padding-left: ${props => (props.leftPadding ? '20px' : 0)};

  margin-bottom: 20px;
`;

const ExplanationText = styled.button`
  display: flex;
  align-items: center;
  position: relative;

  margin-right: 4px;
`;

const Text = styled.p`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);
  white-space: nowrap;

  span {
    font-family: NOTO;
    font-weight: 400;
  }

  strong {
    font-weight: 800;
    color: var(--color-yellow-700);
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
