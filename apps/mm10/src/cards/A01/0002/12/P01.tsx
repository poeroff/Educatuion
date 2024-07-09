import styled from 'styled-components';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';
import { Input } from '@maidt-cntn/ui';
import GradeCheck from '@/components/gradeCheck';
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
      headerInfo={{
        headerPattern: 'icon',
        iconType: 'checkLearnedEmotion',
      }}
      questionInfo={{
        text: (
          <TitleTextContainer>
            <TitleNumber>
              문제 <span>2</span>
              <GradeCheck isGradeAll />
            </TitleNumber>
            <TitleText>다음 수를 소인수분해 하시오.</TitleText>
          </TitleTextContainer>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      vAlign='start'
      useExtend
    >
      <Content>
        <Item>
          <ItemNumber>
            <span>(1)</span> 32
          </ItemNumber>
          <Input
            width='160px'
            inputSize='medium'
            value={getValueInputData(0, 'TEXT-0') as string}
            onChange={e => changeInputData(0, 'TEXT-0', e.currentTarget.value)}
            disabled={isSubmittedInput(0, 'TEXT-0')}
          />
        </Item>
        <Item>
          <ItemNumber>
            <span>(2)</span> 63
          </ItemNumber>
          <Input
            width='160px'
            inputSize='medium'
            value={getValueInputData(1, 'TEXT-0') as string}
            onChange={e => changeInputData(1, 'TEXT-0', e.currentTarget.value)}
            disabled={isSubmittedInput(1, 'TEXT-0')}
          />
        </Item>
        <Item>
          <ItemNumber>
            <span>(3)</span> 98
          </ItemNumber>
          <Input
            width='160px'
            inputSize='medium'
            value={getValueInputData(2, 'TEXT-0') as string}
            onChange={e => changeInputData(2, 'TEXT-0', e.currentTarget.value)}
            disabled={isSubmittedInput(2, 'TEXT-0')}
          />
        </Item>
        <Item>
          <ItemNumber>
            <span>(4)</span> 150
          </ItemNumber>
          <Input
            width='160px'
            inputSize='medium'
            value={getValueInputData(3, 'TEXT-0') as string}
            onChange={e => changeInputData(3, 'TEXT-0', e.currentTarget.value)}
            disabled={isSubmittedInput(3, 'TEXT-0')}
          />
        </Item>
      </Content>
    </Container>
  );
};

export default P01;

const TitleTextContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;
`;

const TitleNumber = styled.div`
  font-family: SUIT;
  font-weight: 500;
  font-size: 24px;
  line-height: 58px;
  color: var(--color-grey-900);

  display: flex;
  align-items: center;

  position: relative;

  span {
    margin-left: 4px;
    font-weight: 800;
    font-size: 36px;
    color: var(--color-yellow-700);
  }

  figure {
    transform: translate(-5px, 10px);
  }
`;

const TitleText = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;

  margin-left: 12px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const ItemNumber = styled.p`
  width: 120px;

  font-family: NOTO;
  font-weight: 400;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  span {
    font-family: SUIT;
    font-weight: 500;
    position: relative;

    figure {
      transform: translate(-5px, 15px);
    }
  }
`;
