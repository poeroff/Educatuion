import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';

import ExampleOneImage from '@/assets/A01/0002/13/A-MM10-0102-11.png';
import TableImage from '@/assets/A01/0002/13/A-MM10-0102-13.png';
import { Box, ESvgType, SvgIcon, Typography } from '@maidt-cntn/ui';
import { useState } from 'react';
import TokTokSVG from '@maidt-cntn/assets/icons/header/header_M_toktok.svg';
import SquareSVG from '@/assets/A01/0002/13/square.svg';

const P01 = () => {
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isTokTokOpen, setIsTokTokOpen] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  return (
    <Container
      headerInfo={{
        headerText: <img src={ExampleOneImage} alt='예제 1' width={112} height={44.2} />,
      }}
      questionInfo={{
        text: (
          <Title>
            소인수분해를 이용하여 <span>75</span>의 약수를 모두 구하시오
          </Title>
        ),
      }}
      useExtend
      vAlign='start'
    >
      <Content>
        <SolutionChipButton
          onClick={() => {
            setIsSolutionOpen(true);
          }}
        >
          풀이
        </SolutionChipButton>

        <Box display='flex' visibility={isSolutionOpen ? 'visible' : 'hidden'}>
          <div>
            <SolutionText>
              <span>75=3×5²</span>이므로 <span>75</span>의 약수는 <span>3</span>의 약수 <span>1, 3</span>과 <span>5²</span>의 약수 <span>1,</span>
            </SolutionText>
            <SolutionText>
              <span>5, 5²</span> 중에서 각각 하나씩 골라 서로 곱한 것이다. 따라서 <span>75</span>의
            </SolutionText>
            <SolutionText>
              약수는 <strong>1, 3, 5, 15, 25, 75</strong>이다.
            </SolutionText>
          </div>
          <img src={TableImage} alt='소인수분해 표' width={160} height={117} style={{ flexShrink: 0 }} />
        </Box>
      </Content>

      <TokTokWrapper>
        <button type='button' onClick={() => setIsTokTokOpen(true)} aria-label='생각톡톡'>
          <SvgIcon src={TokTokSVG} width='81px' height='40px' />
        </button>
        {isTokTokOpen && (
          <>
            <SquareCustom type={ESvgType.IMG} src={SquareSVG} width='876px' height='253px' />
            <AnswerWrapper>
              <Typography>큰 수는 작은 수보다 약수가 항상 더 많을까?</Typography>
              <AnswerTypographyWrapper>
                <AnswerButton onClick={() => setIsAnswerOpen(prev => !prev)}>{isAnswerOpen ? '정답 닫기' : '정답 보기'}</AnswerButton>
                {isAnswerOpen && (
                  <Typography width='850px'>
                    <Number>6{'<'}9</Number>
                    이지만 <Number>6</Number>의 약수는 <Number>1, 2, 3, 6</Number>이고 <Number>9</Number>의 약수는 <Number>1, 3, 9</Number>이므로{' '}
                    <Number>6</Number>의 약수가 더 많다. 따라서 큰 수가 작은 수보다 항상 약수가 더 많은 것은 아니다.
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

export default P01;

const Title = styled.h1`
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

const Content = styled.div`
  display: flex;
  padding-top: 20px;
`;

const SolutionChipButton = styled.button`
  height: fit-content;
  border: 1px solid var(--color-green-700);
  border-radius: 22px;

  padding: 0 16px;

  font-family: SUIT;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: var(--color-green-900);

  flex-shrink: 0;
`;

const SolutionText = styled.p`
  margin-left: 27px;
  margin-right: 16px;

  font-family: SUIT;
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);

  span {
    font-family: NOTO;
  }

  strong {
    font-family: NOTO;
    color: var(--color-pink-500);
  }
`;

const TokTokWrapper = styled.div`
  position: relative;

  margin-top: 40px;
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
  flex-shrink: 0;
  margin-right: 5px;
`;

const AnswerTypographyWrapper = styled.div`
  display: flex;
`;

const Number = styled.span`
  font-family: NOTO;
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
`;
