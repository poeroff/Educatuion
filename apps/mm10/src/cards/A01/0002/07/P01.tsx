import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getDefaultData, getCorrectData } from './pageData';
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
              문제 <span>2</span>
              <GradeCheck isGradeAll />
            </TitleNumber>
            <Title>다음 수의 소인수를 모두 구하시오.</Title>
          </TitleContainer>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <Item>
            <Question>
              <span>(1)</span> 16
            </Question>
            <Inputs>
              <Input
                width='232px'
                inputSize='medium'
                value={getValueInputData(0, 'TEXT-0') as string}
                onChange={e => changeInputData(0, 'TEXT-0', e.currentTarget.value)}
                disabled={isSubmittedInput(0, 'TEXT-0')}
              />
            </Inputs>
          </Item>
          <Item>
            <Question>
              <span>(2)</span> 33
            </Question>
            <Inputs>
              <Input
                width='132px'
                inputSize='medium'
                value={getValueInputData(1, 'TEXT-0') as string}
                onChange={e => changeInputData(1, 'TEXT-0', e.currentTarget.value)}
                disabled={isSubmittedInput(1, 'TEXT-0')}
              />
              <span>,</span>
              <Input
                width='132px'
                inputSize='medium'
                value={getValueInputData(1, 'TEXT-1') as string}
                onChange={e => changeInputData(1, 'TEXT-1', e.currentTarget.value)}
                disabled={isSubmittedInput(1, 'TEXT-1')}
              />
            </Inputs>
          </Item>
          <Item>
            <Question>
              <span>(3)</span> 42
            </Question>
            <Inputs>
              <Input
                width='62px'
                inputSize='medium'
                value={getValueInputData(2, 'TEXT-0') as string}
                onChange={e => changeInputData(2, 'TEXT-0', e.currentTarget.value)}
                disabled={isSubmittedInput(2, 'TEXT-0')}
              />
              <span>,</span>
              <Input
                width='62px'
                inputSize='medium'
                value={getValueInputData(2, 'TEXT-1') as string}
                onChange={e => changeInputData(2, 'TEXT-1', e.currentTarget.value)}
                disabled={isSubmittedInput(2, 'TEXT-1')}
              />
              <span>,</span>
              <Input
                width='62px'
                inputSize='medium'
                value={getValueInputData(2, 'TEXT-2') as string}
                onChange={e => changeInputData(2, 'TEXT-2', e.currentTarget.value)}
                disabled={isSubmittedInput(2, 'TEXT-2')}
              />
            </Inputs>
          </Item>
          <Item>
            <Question>
              <span>(4)</span> 80
            </Question>
            <Inputs>
              <Input
                width='132px'
                inputSize='medium'
                value={getValueInputData(3, 'TEXT-0') as string}
                onChange={e => changeInputData(3, 'TEXT-0', e.currentTarget.value)}
                disabled={isSubmittedInput(3, 'TEXT-0')}
              />
              <span>,</span>
              <Input
                width='132px'
                inputSize='medium'
                value={getValueInputData(3, 'TEXT-1') as string}
                onChange={e => changeInputData(3, 'TEXT-1', e.currentTarget.value)}
                disabled={isSubmittedInput(3, 'TEXT-1')}
              />
            </Inputs>
          </Item>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
};

const ContentsContainer = styled.div`
  height: 100%;
`;

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
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);
`;

const ItemContainer = styled.div`
  display: grid;

  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);

  grid-row-gap: 42px;
  grid-column-gap: 56px;

  padding: 60px 12px 0;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

const Question = styled.p`
  font-family: var(--font-NOTO);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-28);
  line-height: 40px;

  width: 182px;

  span {
    font-family: SUIT;
    position: relative;

    figure {
      transform: translate(-5px, 15px);
    }
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;

  span {
    font-family: var(--font-NOTO);
    font-weight: 500;
    font-size: 28px;
    line-height: 40px;
  }
`;

export default P01;
