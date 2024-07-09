import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Drawing, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { useMemo } from 'react';

function P04() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(4),
    collectDatas: getCorrectData(4),
  });

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue([getValueInputData(6, 'TEXT-0') as string]);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotionPlusScript' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              4 <GradeCheck mainKey={3} />
            </span>
            <h1>
              {' '}
              <span>28</span> × <Rectangle /> 이/가 어떤 자연수의 제곱이 되게 하려고 한다. <Rectangle /> 안에 들어갈 수 있는 가장 작은 자연수를 구하는
              풀이 과정과 답을 쓰시오.
            </h1>
          </Title>
        ),
      }}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='채점하기'
      submitDisabled={hasEmptyValue || pageSubmitted}
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <DrawingContainer>
            <CustomLabel>풀이</CustomLabel>
            <Drawing height='220px' width='100%' />
          </DrawingContainer>
          <AnswerContainer>
            <CustomLabel>정답</CustomLabel>
            <Input
              width='312px'
              inputSize='medium'
              value={getValueInputData(6, 'TEXT-0') as string}
              onChange={e => {
                changeInputData(6, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(6, 'TEXT-0')}
            />
          </AnswerContainer>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 14px;

  h1 {
    font-family: SUIT;
    font-weight: 600;
    font-size: 36px;
    line-height: 54px;
  }

  > span {
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;
  }

  > h1 > span {
    font-family: var(--font-NOTO);
  }

  figure {
    transform: translateX(-15px);
  }
`;

const ItemContainer = styled.div`
  display: flex;

  padding-top: 20px;

  gap: 48px;
`;

const DrawingContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: calc(100% - 48px - 312px);
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const CustomLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 74px;
  height: 38px;
  white-space: nowrap;

  padding: 0 20px;

  font-family: var(--font-SUIT);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-24);
  line-height: 36px;

  border: 2px solid #058943;
  border-radius: 22px;

  color: #00593e;

  background-color: #ffffff;
`;

const Rectangle = styled.div`
  width: 42px;
  height: 42px;

  display: inline-block;
  vertical-align: sub;

  background-color: var(--color-white);

  border: 1px solid var(--color-grey-600);
  border-radius: 8px;
`;

export default P04;
