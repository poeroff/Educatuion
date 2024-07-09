import useCurrentPageData from '@/hooks/useCurrentPageData';
import { Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { useMemo } from 'react';

function P03() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const values = [
      getValueInputData(5, 'TEXT-0') as string,
      getValueInputData(5, 'TEXT-1') as string,
      getValueInputData(5, 'TEXT-2') as string,
      getValueInputData(5, 'TEXT-3') as string,
    ];

    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              3<GradeCheck mainKey={2} />
            </span>{' '}
            다음 수를 소인수분해 하시오.
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
          <Item>
            <Question>
              <span>(1)</span> 45
            </Question>
            <Input
              width='160px'
              inputSize='medium'
              value={getValueInputData(5, 'TEXT-0') as string}
              onChange={e => {
                changeInputData(5, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(5, 'TEXT-0')}
            />
          </Item>
          <Item>
            <Question>
              <span>(2)</span> 56
            </Question>
            <Input
              width='160px'
              inputSize='medium'
              value={getValueInputData(5, 'TEXT-1') as string}
              onChange={e => {
                changeInputData(5, 'TEXT-1', e.target.value);
              }}
              disabled={isSubmittedInput(5, 'TEXT-1')}
            />
          </Item>
          <Item>
            <Question>
              <span>(3)</span> 125
            </Question>
            <Input
              width='160px'
              inputSize='medium'
              value={getValueInputData(5, 'TEXT-2') as string}
              onChange={e => {
                changeInputData(5, 'TEXT-2', e.target.value);
              }}
              disabled={isSubmittedInput(5, 'TEXT-2')}
            />
          </Item>
          <Item>
            <Question>
              <span>(4)</span> 132
            </Question>
            <Input
              width='160px'
              inputSize='medium'
              value={getValueInputData(5, 'TEXT-3') as string}
              onChange={e => {
                changeInputData(5, 'TEXT-3', e.target.value);
              }}
              disabled={isSubmittedInput(5, 'TEXT-3')}
            />
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
    transform: translateX(-15px);
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

export default P03;
