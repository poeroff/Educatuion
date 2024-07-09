import { useState } from 'react';
import HiddenTextButton from '@/components/HiddenTextButton';
import { ESvgType, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import TokTokSVG from '@maidt-cntn/assets/icons/header/header_M_toktok.svg';
import SquareSVG from '@/assets/A01/0003/07/square.svg';

const P01 = () => {
  const [isTokTokOpen, setIsTokTokOpen] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  return (
    <Container headerInfo={{}} useExtend vAlign='start'>
      <TypoWrapper>
        <LineWrapper>
          <Typography weight={600}>한편, 두 자연수 7과 10의 최대공약수는</Typography>
          <HiddenTextButton
            boxWidth={75}
            boxHeight={40}
            content='1'
            textStyle={{
              'font-family': 'NOTO',
              'font-size': '28px',
              'font-weight': '400',
              'line-height': '42px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <Typography weight={600}>이다.</Typography>
        </LineWrapper>
        <LineWrapper>
          <Typography weight={600}>이와 같이 최대공약수가</Typography>
          <HiddenTextButton
            boxWidth={75}
            boxHeight={40}
            content='1'
            textStyle={{
              'font-family': 'NOTO',
              'font-size': '28px',
              'font-weight': '400',
              'line-height': '42px',
              'text-align': 'center',
              color: 'var(--color-grey-900)',
            }}
          />
          <Typography weight={600}>
            인 두 자연수를 <strong>서로소</strong>라고 한다.
          </Typography>
        </LineWrapper>
      </TypoWrapper>
      <TokTokWrapper>
        <button type='button' onClick={() => setIsTokTokOpen(true)} aria-label='생각톡톡'>
          <SvgIcon style={{ cursor: 'pointer' }} type={ESvgType.IMG} src={TokTokSVG} width='81px' height='40px' />
        </button>
        {isTokTokOpen && (
          <>
            <SquareCustom type={ESvgType.IMG} src={SquareSVG} width='876px' height='167px' />
            <AnswerWrapper>
              <Typography weight={600}>서로소인 두 수의 공약수는 몇 개일까?</Typography>
              <AnswerTypographyWrapper>
                <AnswerButton onClick={() => setIsAnswerOpen(prev => !prev)}>{isAnswerOpen ? '정답 닫기' : '정답 보기'}</AnswerButton>
                {isAnswerOpen && <Typography weight={600}>1개</Typography>}
              </AnswerTypographyWrapper>
            </AnswerWrapper>
          </>
        )}
      </TokTokWrapper>
    </Container>
  );
};

export default P01;

const TypoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 38px;
  div:first-child > span:first-child {
    text-indent: 20px;
  }
`;

const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  strong {
    color: var(--color-yellow-700);
    font-weight: var(--font-weight-extraBold);
  }
`;

const TokTokWrapper = styled.div`
  position: relative;
  margin-top: 80px;
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
