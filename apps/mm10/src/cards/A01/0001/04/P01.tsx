import styled from 'styled-components';
import { getCorrectData, getDefaultData } from '@/cards/A01/0001/04/pageData';
import { Input } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';
import GradeCheck from '@/components/gradeCheck';

interface IContent {
  number: number;
  question: string;
  mainKey: number;
  subKey: string;
}

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const allQuestionAnswered = [...Array(4).keys()].every((_, idx) => (getValueInputData(idx, 'TEXT-0') as string).trim() !== '');

  const ContentComp = (content: IContent) => {
    return (
      <Content>
        <DetailNumbering>
          <span>({content.number})</span>
          <span style={{ fontFamily: 'NOTO' }}>{content.question}</span>
        </DetailNumbering>
        <Input
          width='264px'
          maxLength={3}
          value={getValueInputData(content.mainKey, content.subKey) as string}
          onChange={e => {
            handleChangeInputData(content.mainKey, content.subKey, e.target.value);
          }}
          disabled={isSubmittedInput(content.mainKey, content.subKey)}
        />
      </Content>
    );
  };

  return (
    <Container
      headerInfo={{}}
      questionInfo={{
        text: (
          <Numbering>
            <RelativeWrapper>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                <Problem>문제</Problem>
                <Number>1</Number>
              </div>
              <GradeCheck isGradeAll />
            </RelativeWrapper>
            <h1>다음 수가 소수인지 합성수인지 말하시오.</h1>
          </Numbering>
        ),
      }}
      vAlign='flex-start'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      submitLabel='채점하기'
      useExtend
    >
      <ContentWrapper>{QUESTION_LIST.map(content => ContentComp(content))}</ContentWrapper>
    </Container>
  );
};

export default P01;

const Numbering = styled.div`
  display: flex;
  gap: 14px;
  figure {
    transform: translate(-15px, 30px);
  }
`;

const DetailNumbering = styled.div`
  display: flex;
  gap: 6px;
  span {
    font-weight: var(--font-weight-medium);
    font-size: 28px;
    width: 40px;
  }
`;

const RelativeWrapper = styled.div`
  height: fit-content;
  position: relative;
`;

const Problem = styled.h3`
  display: inline;
`;

const Number = styled.span`
  color: var(--color-yellow-700);
`;

const ContentWrapper = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  input {
    font-size: 32px;
    height: 58px;
  }
`;

const QUESTION_LIST: IContent[] = [
  {
    number: 1,
    question: '11',
    mainKey: 0,
    subKey: 'TEXT-0',
  },
  {
    number: 2,
    question: '14',
    mainKey: 1,
    subKey: 'TEXT-0',
  },
  {
    number: 3,
    question: '19',
    mainKey: 2,
    subKey: 'TEXT-0',
  },
  {
    number: 4,
    question: '27',
    mainKey: 3,
    subKey: 'TEXT-0',
  },
];
