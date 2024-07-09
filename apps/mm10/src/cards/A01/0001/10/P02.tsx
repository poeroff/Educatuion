import styled from 'styled-components';
import React from 'react';
import { ChipButton, EChipButtonType, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';

const P02 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted, isDetailCorrect } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: boolean) => {
    if (typeof getValueInputData(mainKey, subKey) === 'boolean' && getValueInputData(mainKey, subKey) === value) {
      changeInputData(mainKey, subKey, null);
      return;
    }
    changeInputData(mainKey, subKey, value);
  };

  const generateSplitText = (text: string) => {
    const splitText = text.split(/\d+/);
    return splitText.map((part, index) => {
      if (index !== splitText.length - 1) {
        const numMatchList = text.match(/\d+/g);
        const number = numMatchList && numMatchList[index];
        return (
          <React.Fragment key={index}>
            {part}
            {number && <span>{number}</span>}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  const allQuestionAnswered = QUESTION.every((_, idx) => getValueInputData(idx, 'BOOLEAN-0') !== '');

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <HeaderWrapper>
            <Typography weight='800' fontSize='36px' color='#996500' style={{ padding: '0 14px 0 8px' }}>
              <span style={{ position: 'relative' }}>
                2
                <GradeCheck isGradeAll />
              </span>
            </Typography>
            <Typography weight='600' fontSize='36px' style={{ padding: '0' }}>
              다음에서 옳은 것은 O표, 옳지 않은 것에는 X표를 하시오.
            </Typography>
          </HeaderWrapper>
        ),
      }}
      submitLabel='채점하기'
      submitDisabled={!allQuestionAnswered || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      useExtend
    >
      <Content>
        <QuestionContainer>
          {QUESTION.map((question, idx) => (
            <Question key={idx}>
              <div>
                <span style={{ position: 'relative' }}>({idx + 1})</span> {generateSplitText(question)}
              </div>
              <CheckboxContainer>
                <ChipButton
                  type='button'
                  status={EChipButtonType.O}
                  height='48px'
                  width='48px'
                  onClick={() => handleChangeInputData(idx, 'BOOLEAN-0', true)}
                  isActive={getValueInputData(idx, 'BOOLEAN-0') as boolean}
                  readOnly={isSubmittedInput(idx, 'BOOLEAN-0')}
                  isError={isSubmittedInput(idx, 'BOOLEAN-0') && !isDetailCorrect(idx, 'BOOLEAN-0')}
                />
                <ChipButton
                  type='button'
                  status={EChipButtonType.X}
                  height='48px'
                  width='48px'
                  onClick={() => handleChangeInputData(idx, 'BOOLEAN-0', false)}
                  isActive={(getValueInputData(idx, 'BOOLEAN-0') as boolean) === false}
                  readOnly={isSubmittedInput(idx, 'BOOLEAN-0')}
                  isError={isSubmittedInput(idx, 'BOOLEAN-0') && !isDetailCorrect(idx, 'BOOLEAN-0')}
                />
              </CheckboxContainer>
            </Question>
          ))}
        </QuestionContainer>
      </Content>
    </Container>
  );
};

export default P02;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;

  figure {
    transform: translate(-3px, 15px);
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  font-family: var(--font-SUIT);
  display: flex;
  margin-top: 30px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 22px;
`;

const Question = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  figure {
    transform: translate(-7px, 18px);
  }

  div {
    font-weight: 500;
    font-size: 28px;
    color: var(--color-grey-900);
    line-height: 32px;
    width: 532px;

    span:nth-child(n + 2) {
      font-family: 'NOTO';
      font-weight: 400;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 134px;
  padding: 8px 16px 8px 10px;
`;

const QUESTION = ['소수의 약수는 2개이다.', '소수는 모두 홀수이다.', '약수가 2개인 합성수가 있다.', '20보다 작은 소수는 8개이다.'];
