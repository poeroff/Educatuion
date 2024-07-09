import styled from 'styled-components';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';
import { Question, Textarea } from '@maidt-cntn/ui';
import LeftImage from '@/assets/A01/0002/09/A-MM10-0102-09.png';
import QuestionImageBackground from '@/assets/A01/0002/09/A-MM10-0102-09-01.png';

import { getCorrectData, getDefaultData } from './pageData';
import { useMemo } from 'react';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted, currentPageInputStates } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });
  const allQuestionAnswered = useMemo(
    () =>
      currentPageInputStates.length > 0 &&
      currentPageInputStates.every(inputState => inputState.inputData.every(({ value }) => !!String(value).trim())),
    [currentPageInputStates],
  );

  return (
    <Container
      headerInfo={{}}
      questionInfo={{ text: '합성수를 여러 가지 순서로 소인수분해 해 보자.' }}
      vAlign='start'
      submitLabel='완료하기'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      useExtend
    >
      <Content>
        <img src={LeftImage} alt='함께하기' height={632} />

        <div>
          <Question
            subject='math'
            type='text'
            number='1'
            text={
              <QuestionTitleContainer>
                <Line>
                  <QuestionNumber>1</QuestionNumber>
                  <QuestionTitle>
                    다음은 <span>24</span>를 두 가지 순서로 소인수분해 하는 과정이다.
                  </QuestionTitle>
                  <InputSample />
                  <QuestionTitle>안에 알맞은</QuestionTitle>
                </Line>
                <Line indent>
                  <QuestionTitle>수를 써넣어 보자.</QuestionTitle>
                </Line>
              </QuestionTitleContainer>
            }
          />

          <QuestionImageContainer>
            <QuestionImage src={QuestionImageBackground} alt='순서 1, 순서 2' />
            <QuestionInput
              top={133}
              left={197}
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => changeInputData(0, 'TEXT-0', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-0')}
            />
            <QuestionInput
              top={176}
              left={214}
              value={getValueInputData(0, 'TEXT-1') as string}
              onChange={e => changeInputData(0, 'TEXT-1', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-1')}
            />
            <QuestionInput
              top={214}
              left={179}
              value={getValueInputData(0, 'TEXT-2') as string}
              onChange={e => changeInputData(0, 'TEXT-2', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-2')}
            />

            <QuestionInput
              top={133}
              left={541}
              value={getValueInputData(0, 'TEXT-3') as string}
              onChange={e => changeInputData(0, 'TEXT-3', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-3')}
            />
            <QuestionInput
              top={176}
              left={558}
              value={getValueInputData(0, 'TEXT-4') as string}
              onChange={e => changeInputData(0, 'TEXT-4', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-4')}
            />
            <QuestionInput
              top={214}
              left={516}
              value={getValueInputData(0, 'TEXT-5') as string}
              onChange={e => changeInputData(0, 'TEXT-5', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-5')}
            />
          </QuestionImageContainer>

          <Question
            subject='math'
            type='text'
            number='1'
            text={
              <QuestionTitleContainer>
                <Line>
                  <QuestionNumber>2</QuestionNumber>
                  <QuestionTitle>[순서 1]과 [순서 2]의 결과를 비교해 보자.</QuestionTitle>
                </Line>
              </QuestionTitleContainer>
            }
          />
          <TextareaContainer>
            <Textarea
              width='788px'
              height='142px'
              value={getValueInputData(1, 'TEXT-0') as string}
              onChange={e => changeInputData(1, 'TEXT-0', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-0')}
            />
          </TextareaContainer>
        </div>
      </Content>
    </Container>
  );
};

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 30px;

  display: flex;
  gap: 20px;
`;

const QuestionTitleContainer = styled.div``;

const Line = styled.div<{ indent?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  padding-left: ${({ indent }) => (indent ? '60px' : '')};
`;

const QuestionNumber = styled.span`
  padding: 4px 18px;

  font-family: SUIT;
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  color: var(--color-yellow-700);
`;

const QuestionTitle = styled.div`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  white-space: nowrap;

  span {
    font-family: NOTO;
  }
`;

const InputSample = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid var(--color-grey-600);
  flex-shrink: 0;
`;

const QuestionImageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 666px;
  height: 278px;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const QuestionImage = styled.img`
  width: 666px;
  height: 278px;
`;

const QuestionInput = styled.input<{ left: number; top: number }>`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid rgba(176, 182, 192, 1);
  background-color: white;

  font-family: STIX;
  font-weight: 500;
  font-size: 24px;
  line-height: 58px;
  color: var(--color-grey-900);
  text-align: center;

  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

const TextareaContainer = styled.div`
  margin-top: 20px;
  margin-left: 62px;
`;

export default P01;
