import { Input } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { getDefaultData, getCorrectData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const PROBLEMS = [
    {
      index: 1,
      question: '4×4×4 =',
      value: getValueInputData(0, 'TEXT-0') as string,
      setValue: (input: string) => changeInputData(0, 'TEXT-0', input),
    },
    {
      index: 2,
      question: '2×2×2×2×7×7×7 =',
      value: getValueInputData(1, 'TEXT-0') as string,
      setValue: (input: string) => changeInputData(1, 'TEXT-0', input),
    },
  ];

  return (
    <Container
      vAlign='start'
      headerInfo={{}}
      questionInfo={{
        text: (
          <TitleContainer>
            <SubTitle>
              문제 <strong>1</strong>
              <GradeCheck isGradeAll />
            </SubTitle>
            <Title>다음을 거듭제곱으로 나타내시오.</Title>
          </TitleContainer>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      useExtend
    >
      <Content>
        {PROBLEMS.map(problem => (
          <Problem
            key={problem.index}
            mainKey={problem.index - 1}
            idx={problem.index}
            question={problem.question}
            value={problem.value}
            setValue={problem.setValue}
            disable={isSubmittedInput(problem.index, `TEXT-${problem.index - 1}`)}
          />
        ))}
      </Content>
    </Container>
  );
};

export default P01;

type ProblemProps = {
  mainKey: number;
  idx: number;
  question: string;
  value: string;
  setValue: (value: string) => void;
  disable?: boolean;
};
const Problem = ({ mainKey, idx, question, value, setValue, disable }: ProblemProps) => {
  return (
    <ProblemContainer>
      <Question>
        <span>({idx})</span>
        {question}
      </Question>
      <Input width='312px' value={value} onChange={e => setValue(e.currentTarget.value)} disabled={disable} />
    </ProblemContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);
`;

const SubTitle = styled.h2`
  font-family: SUIT;
  font-weight: 600;
  font-size: 24px;
  line-height: 58px;
  color: var(--color-grey-900);

  display: flex;
  align-items: center;
  gap: 4px;

  position: relative;

  strong {
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);
  }

  figure {
    transform: translate(-5px, 10px);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 64%;

  margin-top: 33px;
`;

const ProblemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-left: 10px;
`;

const Question = styled.p`
  font-family: NOTO;
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
  color: var(--color-grey-900);

  span {
    position: relative;
    font-family: SUIT;
    margin-right: 10px;

    > figure {
      transform: translate(-5px, 20px);
    }
  }
`;
