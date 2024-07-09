import { Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import { useMemo } from 'react';

function P01() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue([getValueInputData(0, 'TEXT-0') as string, getValueInputData(0, 'TEXT-1') as string]);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              1<GradeCheck mainKey={0} />
            </span>{' '}
            다음을 거듭제곱으로 나타내시오
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
          <Items>
            <Item>
              <Question>
                <span>(1)</span> 3×3×3×3×3×3=
              </Question>
              <Input
                width='312px'
                inputSize='medium'
                value={getValueInputData(0, 'TEXT-0') as string}
                onChange={e => {
                  changeInputData(0, 'TEXT-0', e.target.value);
                }}
                disabled={isSubmittedInput(0, 'TEXT-0')}
              />
            </Item>
            <Item>
              <Question>
                <span>(2)</span> 2×5×2×2×5=
              </Question>
              <Input
                width='312px'
                inputSize='medium'
                value={getValueInputData(0, 'TEXT-1') as string}
                onChange={e => {
                  changeInputData(0, 'TEXT-1', e.target.value);
                }}
                disabled={isSubmittedInput(0, 'TEXT-1')}
              />
            </Item>
          </Items>
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
    transform: translate(-15px, 0);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  padding: 3px 0 3px 22px;

  gap: 12px;
`;

const Question = styled.p`
  font-family: NOTO;
  font-weight: 400;
  font-size: var(--font-size-28);
  line-height: 40px;

  width: 310px; // TODO: 숫자 폰트 추가 시 254px로 수정
  white-space: nowrap;

  span:first-child {
    position: relative;
    font-family: SUIT;
    font-weight: 500;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

export default P01;
