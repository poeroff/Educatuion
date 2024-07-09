import styled from 'styled-components';
import { Input } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';
import GradeCheck from '@/components/gradeCheck';
import { getCorrectData, getDefaultData } from './pageData';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const allQuestionAnswered = [...Array(2).keys()].every((_, idx) => (getValueInputData(0, `TEXT-${idx}`) as string).trim() !== '');

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'connectMath' }}
      questionInfo={{
        text: (
          <Numbering>
            <span style={{ height: 'fitContent', position: 'relative', color: '#F37259', fontWeight: '800' }}>
              1<GradeCheck mainKey={0} />
            </span>
            <h1>
              <span style={{ fontFamily: 'NOTO' }}>6</span>을 <span style={{ fontFamily: 'NOTO' }}>1</span>보다 큰 자연수 두개의 곱으로 나타내 보자.
            </h1>
          </Numbering>
        ),
      }}
      vAlign='start'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      submitLabel='채점하기'
    >
      <EquationWrapper>
        <span className='leftSide'>6 =</span>
        <Input
          width='136px'
          maxLength={3}
          value={getValueInputData(0, 'TEXT-0') as string}
          onChange={e => {
            handleChangeInputData(0, 'TEXT-0', e.target.value);
          }}
          disabled={isSubmittedInput(0, 'TEXT-0')}
        />
        <span className='sign'>×</span>
        <Input
          width='136px'
          maxLength={3}
          value={getValueInputData(0, 'TEXT-1') as string}
          onChange={e => {
            handleChangeInputData(0, 'TEXT-1', e.target.value);
          }}
          disabled={isSubmittedInput(0, 'TEXT-1')}
        />
      </EquationWrapper>
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

const EquationWrapper = styled.div`
  font-family: var(--font-NOTO);
  font-size: var(--font-size-34);
  font-weight: var(--font-weight-bold);
  align-self: center;
  padding-top: 20px;
  input {
    height: 70px;
    font-size: var(--font-size-36);
  }
  .leftSide {
    padding-right: 10px;
  }
  .sign {
    padding: 0px 16px;
  }
`;
