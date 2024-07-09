import HiddenTextButton from '@/components/HiddenTextButton';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

const P01 = () => {
  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <Line leftPadding style={{ marginTop: '30px' }}>
        <Text>
          <span>20</span>을 소인수들만의 곱으로 나타내면&nbsp;<span>20</span>=
        </Text>
        <HiddenTextButton
          boxWidth={175}
          boxHeight={40}
          content='2×2×5'
          textStyle={{
            'font-family': 'NOTO',
            'font-size': '28px',
            'font-weight': '400',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>=</Text>
        <HiddenTextButton
          boxWidth={75}
          boxHeight={40}
          content='2²×5'
          textStyle={{
            'font-family': 'NOTO',
            'font-size': '28px',
            'font-weight': '400',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>이다. 이와 같이 어떤</Text>
      </Line>

      <Line>
        <Text>자연수를 그 수의</Text>
        <HiddenTextButton
          boxWidth={140}
          boxHeight={40}
          content='소인수'
          textStyle={{
            'font-family': 'SUIT',
            'font-size': '28px',
            'font-weight': '600',
            'line-height': '42px',
            'text-align': 'center',
            color: 'var(--color-grey-900)',
          }}
        />
        <Text>
          들만의 곱으로 나타내는 것을 <strong>소인수분해</strong> 한다고 한다.
        </Text>
      </Line>
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
    color: rgba(153, 101, 0, 1);
  }
`;
