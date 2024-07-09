import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';

import ExampleOneImage from '@/assets/A01/0002/11/A-MM10-0102-11.png';
import LogoutSVG from '@/assets/A01/0002/11/logout.svg';
import CrossroadSVG from '@/assets/A01/0002/11/crossroads.svg';
import DivideLevelSVG from '@/assets/A01/0002/11/divide-level.svg';
import { useState } from 'react';
import { SvgIcon } from '@maidt-cntn/ui';

const P01 = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Container
      headerInfo={{
        headerText: <img src={ExampleOneImage} alt='예제 1' width={112} height={44.2} />,
      }}
      questionInfo={{
        text: (
          <Title>
            <span>90</span>을 소인수분해 하시오.
          </Title>
        ),
      }}
      useExtend
    >
      <ToolBoxContainer>
        <ToolBoxChip>교구&공학 도구</ToolBoxChip>

        <ToolBoxTextContainer>
          <SvgIcon src={LogoutSVG} size='24px' />
          <ToolBoxText>블록 코딩으로 소인수분해 하기</ToolBoxText>
        </ToolBoxTextContainer>
      </ToolBoxContainer>

      <Content>
        <SolutionChip onClick={() => setShowAnswer(prev => !prev)}>{showAnswer ? '풀이 닫기' : '풀이 보기'}</SolutionChip>

        <ItemContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Number>90</Number>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Number>=</Number>
              <HighlightNumber style={{ marginTop: '-4px' }}>2</HighlightNumber>
              <Number>×45</Number>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number indent>=2×</Number>
            <HighlightNumber style={{ marginTop: '-4px' }}>3</HighlightNumber>
            <Number>×15</Number>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number indent>=2×3×</Number>
            <HighlightNumber style={{ marginTop: '-4px' }}>3</HighlightNumber>
            <Number>×5</Number>
          </div>
          <Number indent>= {showAnswer && <strong>2×3²×5</strong>}</Number>
        </ItemContainer>

        <VerticalDivider />

        <div>
          <div style={{ display: 'flex' }}>
            <Number style={{ marginTop: '52px' }}>90</Number>

            <div style={{ marginTop: '56px', marginLeft: '18px', marginRight: '16.6px' }}>
              <SvgIcon src={CrossroadSVG} width='21px' height='42px' />
            </div>

            <div style={{ marginTop: '23px', display: 'flex', flexDirection: 'column', gap: '31px' }}>
              <HighlightNumber>2</HighlightNumber>
              <Number>45</Number>
            </div>

            <div style={{ marginTop: '93px', marginLeft: '18px', marginRight: '16.6px' }}>
              <SvgIcon src={CrossroadSVG} width='21px' height='42px' />
            </div>

            <div style={{ marginTop: '62px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <HighlightNumber>3</HighlightNumber>
              <Number>15</Number>
            </div>

            <div style={{ marginTop: '133px', marginLeft: '18px', marginRight: '16.6px' }}>
              <SvgIcon src={CrossroadSVG} width='21px' height='42px' />
            </div>

            <div style={{ marginTop: '105px', display: 'flex', flexDirection: 'column', gap: '42px' }}>
              <HighlightNumber>3</HighlightNumber>
              <HighlightNumber>5</HighlightNumber>
            </div>
          </div>

          <Number style={{ marginTop: '11px' }}>90 = {showAnswer && <strong>2×3²×5</strong>}</Number>
        </div>

        <VerticalDivider />

        <div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '44px', marginBottom: '4px' }}>
            <HighlightNumber style={{ marginTop: '-4px' }}>2</HighlightNumber>
            <Number>90</Number>
            <div style={{ position: 'absolute', left: '42px' }}>
              <SvgIcon src={DivideLevelSVG} width='102px' height='47px' />
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '44px', marginBottom: '4px' }}>
            <HighlightNumber style={{ marginTop: '-4px' }}>3</HighlightNumber>
            <Number>45</Number>
            <div style={{ position: 'absolute', left: '42px' }}>
              <SvgIcon src={DivideLevelSVG} width='102px' height='47px' />
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '44px', marginBottom: '4px' }}>
            <HighlightNumber style={{ marginTop: '-4px' }}>3</HighlightNumber>
            <Number>15</Number>
            <div style={{ position: 'absolute', left: '42px' }}>
              <SvgIcon src={DivideLevelSVG} width='102px' height='47px' />
            </div>
          </div>

          <HighlightNumber style={{ marginLeft: '78px' }}>5</HighlightNumber>

          <Number style={{ marginTop: '4px' }}>90 = {showAnswer && <strong>2×3²×5</strong>}</Number>
        </div>
      </Content>
    </Container>
  );
};

export default P01;

const Title = styled.h1`
  margin-top: 12px;
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  color: var(--color-grey-900);

  span {
    font-family: NOTO;
    font-weight: 400;
  }
`;

const ToolBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;

  margin-bottom: 40px;
`;

const ToolBoxChip = styled.span`
  background-color: rgba(224, 231, 235, 1);
  border-radius: 0 12px 12px 0;

  padding: 8px 10px;

  font-family: SUIT;
  font-weight: 800;
  font-size: 16px;
  color: rgba(3, 43, 86, 1);
`;

const ToolBoxTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ToolBoxText = styled.p`
  font-family: SUIT;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
`;

const Content = styled.div`
  display: flex;
  gap: 19px;
`;

const SolutionChip = styled.button`
  height: fit-content;
  background-color: var(--color-blue-500);
  border-radius: 22px;
  padding: 0 14px;

  font-family: SUIT;
  font-weight: 700;
  font-size: 20px;
  line-height: 42px;
  color: var(--color-white);

  white-space: nowrap;
`;

const VerticalDivider = styled.hr`
  width: 0px;
  height: 100%;
  border-left: 1px dotted var(--color-black);
  margin: 0;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Number = styled.p<{ indent?: boolean }>`
  font-family: NOTO;
  font-weight: 600;
  font-size: 36px;
  line-height: 58px;
  color: var(--color-grey-900);

  padding-left: ${({ indent }) => (indent ? '68px' : 0)};

  white-space: nowrap;

  strong {
    color: var(--color-pink-500);
  }
`;

const HighlightNumber = styled.span`
  background-color: rgba(217, 232, 255, 1);
  border-radius: 50%;
  background-repeat: no-repeat;

  font-family: NOTO;
  font-weight: 600;
  font-size: 36px;
  color: var(--color-grey-900);

  width: 32px;
  height: 32px;

  padding: 0 5px;

  display: inline-block;
`;
