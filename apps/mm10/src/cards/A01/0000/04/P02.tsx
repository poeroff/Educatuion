import styled from 'styled-components';
import { Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import { getCorrectData, getDefaultData } from './pageData';

const P02 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'connectMath' }}
      questionInfo={{
        text: (
          <Numbering>
            <span>
              2<GradeCheck mainKey={0} />
            </span>
            <h1 style={{ textIndent: '16px' }}>
              자음과 모음이 결합된 한글이나, 탄소와 산소가 결합된 이산화 탄소<span>(CO2)</span>처럼 우리 주변에서 두 가지 이상의 요소가 결합되어
              이루어진 것의 예를 찾아보자.
            </h1>
          </Numbering>
        ),
      }}
      vAlign='start'
      onSubmit={submitPageData}
      submitDisabled={pageSubmitted || (getValueInputData(0, 'TEXT-0') as string).trim() === ''}
      submitLabel='완료하기'
    >
      <InputWrapper>
        <Input
          width='480px'
          value={getValueInputData(0, 'TEXT-0') as string}
          onChange={e => {
            handleChangeInputData(0, 'TEXT-0', e.target.value);
          }}
          disabled={isSubmittedInput(0, 'TEXT-0')}
        />
      </InputWrapper>
    </Container>
  );
};

export default P02;

const Numbering = styled.div`
  display: flex;
  gap: 14px;
  span {
    height: fit-content;
    position: relative;
    color: #f37259;
    font-weight: 800;
  }
  h1 span {
    font-family: 'NOTO';
    color: var(--color-grey-900);
    font-weight: 400;
  }
`;

const InputWrapper = styled.div`
  align-self: flex-end;
  input {
    height: 70px;
    font-size: var(--font-size-36);
  }
`;
