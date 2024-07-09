import styled from 'styled-components';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';

type SolutionProps = {
  pageType?: 'SAVE' | 'SUBMIT' | 'GRADE';
  answer: string | React.ReactNode;
  solution?: string | React.ReactNode;
};

export const Solution = ({ pageType, answer, solution }: SolutionProps) => {
  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const getTitle = () => {
    if (pageType === 'GRADE') return '정답';
    return '모범 답안';
  };

  if (isSubmit)
    return (
      <SolutionContainer>
        <Contents>
          <TitleContainer>{getTitle()}</TitleContainer>
          <Content>{answer}</Content>
        </Contents>
        {solution && (
          <Contents>
            <TitleContainer>해설</TitleContainer>
            <Content>{solution}</Content>
          </Contents>
        )}
      </SolutionContainer>
    );
};

const SolutionContainer = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 12px;
  padding: 28px;
  background-color: #eff0f24d;
  border: 1px solid var(--color-grey-200);
  gap: 48px;
  white-space: pre-wrap;
`;

const Contents = styled.div`
  display: flex;
  font-family: var(--font-SUIT);
  flex-direction: column;
  gap: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #1eaa58;
  color: #149b4e;
  font-size: var(--font-size-22);
  font-weight: var(--font-weight-bold);
  width: fit-content;
  padding: 0 20px;
  background-color: #e5f4ea;
`;

const Content = styled.div`
  font-size: var(--font-size-28);
  font-weight: var(--font-weight-medium);
  line-height: 40px;
  color: var(--color-grey-900);
  text-align: left;
`;

export default Solution;
