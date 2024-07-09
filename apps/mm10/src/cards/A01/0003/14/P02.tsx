import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import { Input, TextView } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { useMemo } from 'react';

function P02() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string, index: number) => {
    const newList = [...(getValueInputData(mainKey, subKey) as string[])];
    newList[index] = value;

    changeInputData(mainKey, subKey, newList);
  };

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue([getValueInputData(2, 'TEXT-0') as string, getValueInputData(2, 'TEXT-1') as string]);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              2<GradeCheck isGradeAll />
            </span>{' '}
            <h1>
              다음에서 <span>6</span>과 서로소인 수를 모두 찾으시오.
            </h1>
          </Title>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <TextView title='보기'>
            <ViewItem>2, 3, 4, 5, 6, 7</ViewItem>
          </TextView>
          <Inputs>
            <Input
              width='120px'
              inputSize='medium'
              value={getValueInputData(2, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(2, 'TEXT-0', e.target.value, 0);
              }}
              disabled={isSubmittedInput(2, 'TEXT-0')}
            />
            <span>,</span>
            <Input
              width='120px'
              inputSize='medium'
              value={getValueInputData(2, 'TEXT-1') as string}
              onChange={e => {
                handleChangeInputData(2, 'TEXT-1', e.target.value, 1);
              }}
              disabled={isSubmittedInput(2, 'TEXT-1')}
            />
          </Inputs>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  font-size: 36px;
  font-weight: 600;
  line-height: 54px;

  span {
    font-family: NOTO;
    font-weight: 400;
  }

  > span:first-child {
    font-family: SUIT;
    font-weight: 800;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;

    margin-right: 14px;
  }

  figure {
    transform: translateX(-15px);
  }
`;

const ItemContainer = styled.div`
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;
`;

const ViewItem = styled.p`
  width: 480px;
  height: 82px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: NOTO;
  font-size: 28px;
  font-weight: 400;
  line-height: 42px;
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
`;

export default P02;
