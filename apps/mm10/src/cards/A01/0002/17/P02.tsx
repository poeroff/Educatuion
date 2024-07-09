import { Fragment } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';

function P02() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const question1Answered = [...Array(2).keys()].every((_, idx) => (getValueInputData(1, `TEXT-${idx}`) as string).trim() !== '');
  const question2Answered = [...Array(2).keys()].every((_, idx) => (getValueInputData(2, `TEXT-${idx}`) as string).trim() !== '');
  const question3Answered = [...Array(2).keys()].every((_, idx) => (getValueInputData(3, `TEXT-${idx}`) as string).trim() !== '');
  const question4Answered = [...Array(3).keys()].every((_, idx) => (getValueInputData(4, `TEXT-${idx}`) as string).trim() !== '');

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              2<GradeCheck mainKey={1} />
            </span>{' '}
            다음 수의 소인수를 모두 구하시오.
          </Title>
        ),
      }}
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !(question1Answered && question2Answered && question3Answered && question4Answered)}
      submitLabel='채점하기'
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <Item>
            <Question>
              <span>(1)</span> 18
            </Question>
            <Inputs>
              <Fragment>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(1, 'TEXT-0') as string}
                  onChange={e => {
                    handleChangeInputData(1, 'TEXT-0', e.target.value);
                  }}
                  disabled={isSubmittedInput(1, 'TEXT-0')}
                />
                <span>,</span>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(1, 'TEXT-1') as string}
                  onChange={e => {
                    handleChangeInputData(1, 'TEXT-1', e.target.value);
                  }}
                  disabled={isSubmittedInput(1, 'TEXT-1')}
                />
              </Fragment>
            </Inputs>
          </Item>
          <Item>
            <Question>
              <span>(2)</span> 26
            </Question>
            <Inputs>
              <Fragment>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(2, 'TEXT-0') as string}
                  onChange={e => {
                    handleChangeInputData(2, 'TEXT-0', e.target.value);
                  }}
                  disabled={isSubmittedInput(2, 'TEXT-0')}
                />
                <span>,</span>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(2, 'TEXT-1') as string}
                  onChange={e => {
                    handleChangeInputData(2, 'TEXT-1', e.target.value);
                  }}
                  disabled={isSubmittedInput(2, 'TEXT-1')}
                />
              </Fragment>
            </Inputs>
          </Item>
          <Item>
            <Question>
              <span>(3)</span> 35
            </Question>
            <Inputs>
              <Fragment>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(3, 'TEXT-0') as string}
                  onChange={e => {
                    handleChangeInputData(3, 'TEXT-0', e.target.value);
                  }}
                  disabled={isSubmittedInput(3, 'TEXT-0')}
                />
                <span>,</span>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(3, 'TEXT-1') as string}
                  onChange={e => {
                    handleChangeInputData(3, 'TEXT-1', e.target.value);
                  }}
                  disabled={isSubmittedInput(3, 'TEXT-1')}
                />
              </Fragment>
            </Inputs>
          </Item>
          <Item>
            <Question>
              <span>(4)</span> 84
            </Question>
            <Inputs>
              <Fragment>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(4, 'TEXT-0') as string}
                  onChange={e => {
                    handleChangeInputData(4, 'TEXT-0', e.target.value);
                  }}
                  disabled={isSubmittedInput(4, 'TEXT-0')}
                />
                <span>,</span>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(4, 'TEXT-1') as string}
                  onChange={e => {
                    handleChangeInputData(4, 'TEXT-1', e.target.value);
                  }}
                  disabled={isSubmittedInput(4, 'TEXT-1')}
                />
                <span>,</span>
                <Input
                  width='100px'
                  inputSize='medium'
                  value={getValueInputData(4, 'TEXT-2') as string}
                  onChange={e => {
                    handleChangeInputData(4, 'TEXT-2', e.target.value);
                  }}
                  disabled={isSubmittedInput(4, 'TEXT-2')}
                />
              </Fragment>
            </Inputs>
          </Item>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;

  gap: 14px;

  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  span {
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;
  }
  figure {
    transform: translate(-15px, 30px);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 30px;

  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

const Question = styled.p`
  font-family: var(--font-NOTO);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-28);
  line-height: 36px;

  width: 120px;
  padding-left: 12px;

  span {
    font-family: SUIT;
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

  span:last-child {
    display: none;
  }
`;

export default P02;
