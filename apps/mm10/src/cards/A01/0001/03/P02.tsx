import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import { ESvgType, SvgIcon, Typography } from '@maidt-cntn/ui';
import BackgroundPNG from '@/assets/A01/0001/03/A-MM1-0101-03.png';
import ArrowSVG from '@/assets/A01/0001/03/arrow.svg';
import SquareSVG from '@/assets/A01/0001/03/square.svg';
import HiddenTextButton from '@/components/A01/0001/03/HiddenTextButton';
import TokTokSVG from '@maidt-cntn/assets/icons/header/header_M_toktok.svg';
import { useState } from 'react';

const P02 = () => {
  const [isTokTokOpen, setIsTokTokOpen] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <SVGWrapper>
        <ExamWrapper>보기</ExamWrapper>
        <SvgIcon type={ESvgType.IMG} src={FILE_URL} width='900px' height='256px' />
        <LeftBubble>
          <span>13</span>은 약수가 <span>1</span>과 자기 자신 뿐이야.
        </LeftBubble>
        <LeftCenter>
          <div>13의 약수 1, 13</div>
          <div>
            <SvgIcon type={ESvgType.IMG} src={ArrowSVG} />
            <span style={{ fontFamily: 'SUIT' }}>&nbsp;13은</span>
            <HiddenTextButton
              boxWidth={72}
              boxHeight={40}
              content='소수'
              textStyle={{
                'font-family': 'SUIT',
                'font-size': '22px',
                'font-weight': '500',
                'line-height': '32px',
                'text-align': 'center',
                color: 'var(--color-grey-900)',
              }}
            />
          </div>
        </LeftCenter>
        <RightBubble>
          <span>15</span>는 <span>1</span>과
          <br /> 자기 자신 이외의 약수도 있어
        </RightBubble>
        <RightCenter>
          <div>15의 약수 1, 3, 5, 15</div>
          <div>
            <SvgIcon type={ESvgType.IMG} src={ArrowSVG} />
            <span style={{ fontFamily: 'SUIT' }}>&nbsp;15는</span>
            <HiddenTextButton
              boxWidth={89}
              boxHeight={40}
              content='합성수'
              textStyle={{
                'font-family': 'SUIT',
                'font-size': '22px',
                'font-weight': '500',
                'line-height': '32px',
                'text-align': 'center',
                color: 'var(--color-grey-900)',
              }}
            />
          </div>
        </RightCenter>
      </SVGWrapper>
      <TokTokWrapper>
        <button type='button' onClick={() => setIsTokTokOpen(true)} aria-label='생각톡톡'>
          <SvgIcon style={{ cursor: 'pointer' }} type={ESvgType.IMG} src={TokTokSVG} width='81px' height='40px' />
        </button>
        {isTokTokOpen && (
          <>
            <SquareCustom type={ESvgType.IMG} src={SquareSVG} width='876px' height='167px' />
            <AnswerWrapper>
              <Typography>소수의 약수는 몇 개일까?</Typography>
              <AnswerTypographyWrapper>
                <AnswerButton onClick={() => setIsAnswerOpen(prev => !prev)}>{isAnswerOpen ? '정답 닫기' : '정답 보기'}</AnswerButton>
                {isAnswerOpen && (
                  <Typography>
                    <span style={{ fontFamily: 'NOTO' }}>2</span>개
                  </Typography>
                )}
              </AnswerTypographyWrapper>
            </AnswerWrapper>
          </>
        )}
      </TokTokWrapper>
    </Container>
  );
};

export default P02;

const SVGWrapper = styled.div`
  position: relative;
  margin-top: 70px;
  > div {
    font-weight: var(--font-weight-medium);
    position: absolute;
  }
`;

const ExamWrapper = styled.div`
  position: absolute;
  top: -42px;
  width: 64px;
  height: 28px;
  border-radius: 12px;
  padding: 0px 16px;
  font-family: var(--font-SUIT);
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  line-height: 28px;
  color: var(--color-white);
  background-color: var(--color-grey-700);
`;

const LeftBubble = styled.div`
  top: 22px;
  left: 44px;
  width: 96px;
  height: 84px;
  font-size: var(--font-size-18);
  line-height: 28px;
  text-align: center;
  word-break: keep-all;
  span {
    font-family: 'NOTO';
  }
`;

const LeftCenter = styled.div`
  display: flex;
  flex-direction: column;
  top: 104px;
  left: 270px;
  font-size: var(--font-size-22);
  line-height: 32px;
  button {
    display: inline-block;
  }
  span {
    font-family: 'NOTO';
  }
`;

const RightBubble = styled.div`
  top: 22px;
  left: calc(100% - 250px);
  width: 119px;
  height: 84px;
  font-size: var(--font-size-18);
  line-height: 28px;
  text-align: center;
  word-break: keep-all;
  span {
    font-family: 'NOTO';
  }
`;
const RightCenter = styled.div`
  display: flex;
  flex-direction: column;
  top: 104px;
  left: calc(100% - 538px);
  font-size: var(--font-size-22);
  line-height: 32px;
  button {
    display: inline-block;
  }
  span {
    font-family: 'NOTO';
  }
`;

const TokTokWrapper = styled.div`
  position: relative;
`;

const SquareCustom = styled(SvgIcon)`
  position: absolute;
  top: 0px;
  left: calc(81px + 8px);
`;

const AnswerWrapper = styled.div`
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnswerButton = styled.button`
  background-color: #0091ff;
  border: none;
  border-radius: 22px;
  width: 103px;
  height: 42px;
  color: var(--color-white);
  font-size: 20px;
  line-height: 42px;
`;

const AnswerTypographyWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
`;

const FILE_URL = '/A01/0001/03/A-MM1-0101-03-02.png';
