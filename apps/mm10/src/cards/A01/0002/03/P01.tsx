import styled from 'styled-components';
import { useRef, useState } from 'react';
import ChatBubble from '@/components/ChatBubble';
import HiddenTextButton from '@/components/HiddenTextButton';
import { Container } from '@maidt-cntn/ui/math';
import { EImageType, Image } from '@maidt-cntn/ui';

const P01 = () => {
  const [clicked, setClicked] = useState(false);

  const tooltopRef = useRef<HTMLButtonElement>(null);
  const fileUrl = '/A01/0002/03/A-MM1-0102-03-01.png';

  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <TextContainer>
        <Line leftPadding>
          <Text>같은 수를 여러 번 곱할 때는 곱하는 수와 그 수가 곱해진 개수를 이용하여 간단히</Text>
        </Line>

        <Line>
          <ExplanationText>
            <Number>2×2=2²</Number>
            <ToopTipIcon ref={tooltopRef} onClick={() => setClicked(prev => !prev)} />
            {clicked && (
              <ChatBubble
                text={
                  <Text>
                    <span>2¹=2</span>로 정한다.
                  </Text>
                }
                direction='top'
                onClickClose={() => setClicked(false)}
                iconRef={tooltopRef}
              />
            )}
          </ExplanationText>
          &nbsp;<Number>,</Number>
          <HiddenTextButton
            boxWidth={175}
            boxHeight={40}
            content='2×2×2=2³'
            textStyle={{
              'font-family': 'NOTO',
              'font-size': '28px',
              'font-weight': '500',
              'line-height': '40px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <Number>,</Number>
          <HiddenTextButton
            boxWidth={230}
            boxHeight={40}
            content='2×2×2×2=2⁴'
            textStyle={{
              'font-family': 'NOTO',
              'font-size': '28px',
              'font-weight': '500',
              'line-height': '40px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <Number>,</Number>
          <Text>... 과 같이 나타낸다.</Text>
        </Line>

        <Line leftPadding>
          <Text>이때</Text>&nbsp;
          <Number>2², 2³, 2⁴, ...</Number>
          <Text>을 각각</Text>&nbsp;
          <Number>2</Number>
          <Text>의&nbsp;</Text>
          <HiddenTextButton
            boxWidth={75}
            boxHeight={40}
            content='제곱'
            textStyle={{
              'font-family': 'SUIT',
              'font-size': '28px',
              'font-weight': '500',
              'line-height': '40px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          &nbsp;<Number>,</Number>
          <Number>2</Number>
          <Text>의&nbsp;</Text>
          <HiddenTextButton
            boxWidth={75}
            boxHeight={40}
            content='세제곱'
            textStyle={{
              'font-family': 'SUIT',
              'font-size': '28px',
              'font-weight': '500',
              'line-height': '40px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          &nbsp;<Number>,</Number>
          <Number>2</Number>
          <Text>의&nbsp;</Text>
          <HiddenTextButton
            boxWidth={75}
            boxHeight={40}
            content='네제곱'
            textStyle={{
              'font-family': 'SUIT',
              'font-size': '28px',
              'font-weight': '500',
              'line-height': '40px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <Number>, ...</Number>
          <Text>이라 읽고, </Text>
        </Line>

        <Line>
          <Text>이들을 통틀어&nbsp;</Text>
          <Number>2</Number>의&nbsp;<EmphasizedText>거듭제곱</EmphasizedText>이라고 한다. 또 곱하는 수&nbsp;<Number>2</Number>를 거듭제곱의&nbsp;
          <EmphasizedText>밑</EmphasizedText>,&nbsp;<Number>2</Number>가 곱해진 개수
        </Line>

        <Line>
          <Number>2, 3, 4 ...</Number>를 거듭제곱의&nbsp;
          <EmphasizedText>지수</EmphasizedText>라고 한다.
        </Line>
      </TextContainer>
      <ImageWrapper>
        <Image src={fileUrl ?? ''} width='262px' height='168px' type={EImageType.IMG_BG} alt='' />
      </ImageWrapper>
    </Container>
  );
};

export default P01;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 38px;
  white-space: nowrap;
`;

const Line = styled.div<{ leftPadding?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;

  padding-left: ${props => (props.leftPadding ? '20px' : 0)};

  margin-bottom: 20px;
`;

const Text = styled.p`
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  white-space: nowrap;

  span {
    font-family: NOTO;
    font-weight: 400;
  }
`;

const Number = styled.span`
  font-family: NOTO;
  font-size: 28px;
  font-weight: 400;
  line-height: 42px;
  margin-right: 4px;
  display: flex;
  padding-top: 2px;
  white-space: nowrap;
`;

const ExplanationText = styled.button`
  display: flex;
  align-items: center;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  line-height: 40px;
  padding: 1px 4px 0 0;
  cursor: pointer;
  gap: 2px;

  font-family: 'STIX';
  font-size: var(--font-size-28);
  font-weight: var(--font-weight-medium);
`;

const ToopTipIcon = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-pink-500);
  transform: translateY(-4px);
  cursor: pointer;
`;

const EmphasizedText = styled.span`
  font-family: 'SUIT';
  font-size: var(--font-size-28);
  font-weight: var(--font-weight-semiBold);
  line-height: 42px;
  color: var(--color-yellow-700);
  white-space: nowrap;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
