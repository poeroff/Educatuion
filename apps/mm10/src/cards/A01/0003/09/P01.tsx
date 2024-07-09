import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

import LeftImage from '@/assets/A01/0003/09/A-MM10-010003-09.png';
import Image1 from '@/assets/A01/0003/09/A-MM10-010003-09-1.png';
import Image2 from '@/assets/A01/0003/09/A-MM10-010003-09-2.png';
import TooltipImage from '@/assets/A01/0003/09/A-MM10-010003-09-3.png';
import { ChangeEventHandler, ReactNode, useMemo, useRef, useState } from 'react';
import { Box, EStyleButtonTypes, Input } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import ChatBubble from '@/components/A01/0001/09/ChatBubble';
import LearnedImage from '@/assets/A01/0003/09/A-MM10-010003-09-5.png';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const tooltipRef = useRef<HTMLButtonElement>(null);
  const learnedImageRef = useRef<HTMLImageElement>(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [showLearnedTooltip, setShowLearnedTooltip] = useState(false);

  const hasInputValue = useMemo(() => {
    return (
      String(getValueInputData(0, 'TEXT-0')).length || String(getValueInputData(1, 'TEXT-0')).length || String(getValueInputData(2, 'TEXT-0')).length
    );
  }, [getValueInputData]);

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const values = [getValueInputData(0, 'TEXT-0') as string, getValueInputData(1, 'TEXT-0') as string, getValueInputData(2, 'TEXT-0') as string];

    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={null}
      questionInfo={{
        text: (
          <HeaderTitle>
            <span>1</span>소인수분해를 이용하여 최소공배수를 어떻게 구할까?
          </HeaderTitle>
        ),
      }}
      useExtend
      vAlign='start'
      onSubmit={submitPageData}
      submitBtnColor={hasInputValue ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
      submitDisabled={hasEmptyValue || pageSubmitted}
    >
      <TitleContainer>
        <Title>소인수분해를 이용하여 최대공약수를 구하는 방법을 알아보자.</Title>
        <Box cursor='pointer'>
          <img src={LearnedImage} alt='learned' width='124px' height='36px' onClick={() => setShowLearnedTooltip(true)} ref={learnedImageRef} />
        </Box>
      </TitleContainer>

      <ContentContainer>
        <img src={LeftImage} alt='함께 하기' width='110px' />

        <div>
          <ContentTitle>
            다음은 <span>24</span>와 <span>60</span>을 각각 소인수분해를 하여 최소공배수를 구한 것이다.
          </ContentTitle>

          <ImageContainer>
            <img
              src={Image1}
              width='445px'
              alt='24를 소인수분해 하면 2곱하기 2곱하기 2곱하기 3이고, 60을 소인수분해 하면 2곱하기 2곱하기 3곱하기 5이다. 따라서 최소공배수는 2곱하기 2곱하기 2곱하기 3곱하기 5이다.'
            />
            <img
              src={Image2}
              width='425px'
              alt='24를 소인수분해 하면 2의 제곱 곱하기 3이고, 60을 소인수분해 하면 2의 제곱 곱하기 2곱하기 5이다. 이 때 최소공배수는 3곱하기 5곱하기 2의 몇 제곱일까?'
            />
          </ImageContainer>

          <Questions>
            <Question
              num={1}
              title={
                <>
                  <Number style={{ alignSelf: 'baseline' }}>1</Number>
                  <QuestionTitleText>
                    에서 색칠한 <ColoredNumber color='var(--color-pink-100)'>2</ColoredNumber>×
                    <ColoredNumber color='var(--color-pink-100)'>2</ColoredNumber>×<ColoredNumber color='var(--color-green-50)'>2</ColoredNumber>×
                    <ColoredNumber color='var(--color-pink-100)'>3</ColoredNumber>×<ColoredNumber color='var(--color-green-50)'>5</ColoredNumber>가{' '}
                    <strong>24</strong>와 <strong>60</strong>의 최소공배수임을 확인해 보자.
                    <TooltipButton ref={tooltipRef} onClick={() => setShowTooltip(true)} />
                  </QuestionTitleText>
                </>
              }
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => changeInputData(0, 'TEXT-0', e.currentTarget.value)}
              inputDisabled={isSubmittedInput(0, 'TEXT-0')}
            />
            <Question
              num={2}
              title={
                <>
                  <Number>1</Number>
                  <QuestionTitleText>의 결과를 이용하여</QuestionTitleText>
                  <Number>2</Number>
                  <QuestionTitleText>의</QuestionTitleText>
                  <SampleInput />
                  <QuestionTitle>안에 알맞은 수를 써넣어 보자.</QuestionTitle>
                </>
              }
              value={getValueInputData(1, 'TEXT-0') as string}
              onChange={e => changeInputData(1, 'TEXT-0', e.currentTarget.value)}
              inputDisabled={isSubmittedInput(1, 'TEXT-0')}
            />
            <Question
              num={3}
              title={
                <>
                  <Number style={{ display: 'flex', alignSelf: 'baseline' }}>2</Number>
                  <QuestionTitleText>
                    와 같이 두 수를 소인수분해 하여 거듭제곱으로 나타낸 결과를 보고
                    <br /> 최소공배수를 구하는 방법을 말해 보자.
                  </QuestionTitleText>
                </>
              }
              value={getValueInputData(2, 'TEXT-0') as string}
              onChange={e => changeInputData(2, 'TEXT-0', e.currentTarget.value)}
              inputDisabled={isSubmittedInput(2, 'TEXT-0')}
            />
          </Questions>
        </div>
      </ContentContainer>

      {showTooltip && (
        <ChatBubble
          iconRef={tooltipRef}
          direction='top'
          onClickClose={() => setShowTooltip(false)}
          width='268px'
          image={{ url: TooltipImage, width: '228px', height: '298px', alt: '24와 60의 최대공약수는 12이다.' }}
        />
      )}

      {showLearnedTooltip && (
        <ChatBubble
          iconRef={learnedImageRef}
          direction='top'
          onClickClose={() => setShowLearnedTooltip(false)}
          text='두 수의 공통인 배수를 두 수의 공배수라 하고, 공배수 중에서 가장 작은 수를 두 수의 최소공배수라고 한다.'
        />
      )}
    </Container>
  );
};

export default P01;

interface IQuestionProps {
  num: number;
  title: ReactNode;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputDisabled?: boolean;
}
const Question = ({ num, title, value, onChange, inputDisabled }: IQuestionProps) => {
  return (
    <QuestionContainer>
      <QuestionNum>{num}</QuestionNum>

      <QuestionTitleContainer>
        <QuestionTitle>{title}</QuestionTitle>
        <Input inputSize='medium' width='100%' value={value} onChange={onChange} disabled={inputDisabled} />
      </QuestionTitleContainer>
    </QuestionContainer>
  );
};

const QuestionContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const QuestionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 798px;

  padding-top: 4px;
`;

const QuestionNum = styled.p`
  font-family: SUIT;
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  color: var(--color-yellow-700);
  height: fit-content;

  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderTitle = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);

  display: flex;
  align-items: center;
  gap: 14px;

  span {
    font-weight: 800;
    line-height: 58px;
    color: var(--color-yellow-700);
  }

  figure {
    transform: translateX(-15px);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 27px;
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

const ContentTitle = styled.p`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);

  span {
    font-family: NOTO;
    font-weight: 400;
  }
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Number = styled.span`
  border-radius: 50%;
  background-color: var(--color-grey-700);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-right: 0.5px;

  font-family: SUIT;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: var(--color-white);
`;

const QuestionTitleText = styled.p`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);

  strong {
    font-family: NOTO;
    font-weight: 400;
  }
`;

const TooltipButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-pink-500);

  transform: translateY(-5px);

  flex-shrink: 0;
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SampleInput = styled.div`
  width: 38px;
  height: 38px;
  border: 1px solid rgba(176, 182, 192, 1);
  border-radius: 8px;
  background-color: var(--color-white);
`;

const ColoredNumber = styled.span<{ color: string }>`
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  border-radius: 50%;

  font-family: NOTO;
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;
  color: var(--color-grey-900);
`;
