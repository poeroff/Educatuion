import styled from 'styled-components';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';
import { getCorrectData, getDefaultData } from './pageData';
import { Input } from '@maidt-cntn/ui';
import GradeCheck from '@/components/gradeCheck';
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
      questionInfo={{
        text: (
          <TitleContainer>
            <TitleNumber>
              문제 <span>4</span>
              <GradeCheck isGradeAll />
            </TitleNumber>
            <Title>소인수분해를 이용하여 다음 수의 약수를 모두 구하시오</Title>
          </TitleContainer>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      vAlign='start'
      useExtend
    >
      <Content>
        <Line>
          <Question>
            <span>(1)</span> 2²×5²
          </Question>
          <InputContainer>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => changeInputData(0, 'TEXT-0', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-0')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-1') as string}
              onChange={e => changeInputData(0, 'TEXT-1', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-1')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-2') as string}
              onChange={e => changeInputData(0, 'TEXT-2', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-2')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-3') as string}
              onChange={e => changeInputData(0, 'TEXT-3', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-3')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-4') as string}
              onChange={e => changeInputData(0, 'TEXT-4', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-4')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-5') as string}
              onChange={e => changeInputData(0, 'TEXT-5', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-5')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-6') as string}
              onChange={e => changeInputData(0, 'TEXT-6', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-6')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-7') as string}
              onChange={e => changeInputData(0, 'TEXT-7', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-7')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(0, 'TEXT-8') as string}
              onChange={e => changeInputData(0, 'TEXT-8', e.currentTarget.value)}
              disabled={isSubmittedInput(0, 'TEXT-8')}
            />
          </InputContainer>
        </Line>

        <Line>
          <Question>
            <span>(2)</span> 54
          </Question>
          <InputContainer>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-0') as string}
              onChange={e => changeInputData(1, 'TEXT-0', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-0')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-1') as string}
              onChange={e => changeInputData(1, 'TEXT-1', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-1')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-2') as string}
              onChange={e => changeInputData(1, 'TEXT-2', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-2')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-3') as string}
              onChange={e => changeInputData(1, 'TEXT-3', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-3')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-4') as string}
              onChange={e => changeInputData(1, 'TEXT-4', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-4')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-5') as string}
              onChange={e => changeInputData(1, 'TEXT-5', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-5')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-6') as string}
              onChange={e => changeInputData(1, 'TEXT-6', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-6')}
            />
            <p>,</p>
            <Input
              width='64px'
              inputSize='medium'
              value={getValueInputData(1, 'TEXT-7') as string}
              onChange={e => changeInputData(1, 'TEXT-7', e.currentTarget.value)}
              disabled={isSubmittedInput(1, 'TEXT-7')}
            />
          </InputContainer>
        </Line>
      </Content>
    </Container>
  );
};

export default P01;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;
`;

const TitleNumber = styled.p`
  font-family: SUIT;
  font-weight: 500;
  font-size: 24px;
  line-height: 58px;
  color: var(--color-grey-900);

  display: flex;
  align-items: center;
  gap: 4px;

  position: relative;

  span {
    font-weight: 800;
    font-size: 36px;
    color: var(--color-yellow-700);
  }

  figure {
    transform: translate(-5px, 10px);
  }
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);

  span {
    font-family: NOTO;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 18px;

  margin-top: 33px;
  margin-left: 22px;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Question = styled.p`
  width: 160px;
  font-family: NOTO;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  flex-shrink: 0;
  white-space: nowrap;

  span {
    font-family: SUIT;
    font-weight: 400;
    position: relative;

    transform: translate(-5px, 15px);
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;

  p {
    font-family: NOTO;
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    color: var(--color-grey-900);
  }
`;
