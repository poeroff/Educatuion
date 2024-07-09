import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Drawing, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import Image1 from '@/assets/A01/0001/07/Image1.png';
import GradeCheck from '@/components/gradeCheck';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted, isDetailCorrect } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string, index: number) => {
    const newList = [...(getValueInputData(mainKey, subKey) as string[])];
    newList[index] = value;

    changeInputData(mainKey, subKey, newList);
  };

  const allQuestionAnswered = [...Array(10).keys()].every(_ => (getValueInputData(0, 'TEXT_LIST-0') as string[]).length === 10);

  return (
    <Container
      headerInfo={{}}
      questionInfo={{
        text: (
          <Header>
            <QuestionNumber>
              문제&nbsp;
              <span style={{ position: 'relative' }}>
                <GradeCheck isGradeAll />2
              </span>
            </QuestionNumber>
            <Question>
              <span>51</span>부터 <span>100</span>까지 자연수 중에서 소수를 모두 찾으시오.
            </Question>
          </Header>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
    >
      <Content>
        <Drawing image={{ src: Image1, alt: '' }} width='738px' height='313px' />
        <TextareaContainer>
          {[...Array(10).keys()].map(i => (
            <TextareaWrapper key={i}>
              <Input
                width='143px'
                inputSize='medium'
                key={i}
                disabled={isSubmittedInput(0, 'TEXT_LIST-0')}
                value={(getValueInputData(0, 'TEXT_LIST-0') as string[])[i] || ''}
                onChange={e => {
                  handleChangeInputData(0, 'TEXT_LIST-0', e.target.value, i);
                }}
                placeholder=''
                status={isDetailCorrect(0, 'TEXT_LIST-0', true) && !(isDetailCorrect(0, 'TEXT_LIST-0', true) as boolean[])[i] ? 'error' : 'default'}
              />
              {i !== 4 && i !== 9 && <Comma>,</Comma>}
            </TextareaWrapper>
          ))}
        </TextareaContainer>
      </Content>
    </Container>
  );
};

export default P01;

const Header = styled.div`
  display: flex;
  gap: 14px;
  margin-top: -12px;
`;

const QuestionNumber = styled.span`
  display: inline-flex;

  font-family: 'SUIT';
  font-size: 30px;
  font-weight: 500;
  line-height: 58px;
  color: var(--color-grey-900);

  span {
    font-weight: 800;
    font-size: 36px;
    color: var(--color-yellow-700);
  }
`;

const Question = styled.span`
  font-size: 36px;
  font-weight: 600;
  line-height: 58px;
  span {
    font-family: 'NOTO';
    font-weight: 400;
  }
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TextareaWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Comma = styled.span`
  display: inline-flex;
  align-items: flex-end;

  font-family: 'NOTO';
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
`;
