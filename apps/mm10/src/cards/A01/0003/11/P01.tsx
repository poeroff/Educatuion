import { Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
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
    const values = [getValueInputData(0, 'TEXT-0') as string, getValueInputData(1, 'TEXT-0') as string];

    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={null}
      questionInfo={{
        text: (
          <Title>
            <span>
              문제<span>3</span> <GradeCheck isGradeAll />
            </span>
            소인수분해를 이용하여 다음 두 수의 최대공약수를 구하시오.
          </Title>
        ),
      }}
      submitLabel='채점하기'
      useExtend
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
    >
      <ContentsContainer>
        <ItemContainer>
          <Items>
            <Item>
              <Question>
                <span>(1)</span> 2<sup>3</sup>
                <span>x</span>3<sup>5</sup>, 2<sup>3</sup>
                <span>x</span>3<sup>2</sup>
                <span>x</span>5
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
                <span>(2)</span> 56, 70
              </Question>
              <Input
                width='312px'
                inputSize='medium'
                value={getValueInputData(1, 'TEXT-0') as string}
                onChange={e => {
                  changeInputData(1, 'TEXT-0', e.target.value);
                }}
                disabled={isSubmittedInput(1, 'TEXT-0')}
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

  > span {
    display: flex;
    align-items: center;

    gap: 4px;

    font-weight: 500;
    font-size: 24px;
    line-height: 58px;
    color: var(--color-grey-900);
    position: relative;

    > span {
      font-weight: 800;
      font-size: 36px;
      line-height: 58px;
      color: var(--color-yellow-700);
    }
  }

  figure {
    transform: translateX(-15px);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  padding: 3px 0 3px 22px;

  gap: 24px;
`;

const Question = styled.p`
  font-family: NOTO;
  font-weight: 400;
  font-size: var(--font-size-28);
  line-height: 40px;

  width: 290px;

  span:first-child {
    position: relative;
    font-weight: 500;

    figure {
      margin-top: 12px;
      margin-left: -8px;
    }
  }

  span {
    font-family: SUIT;
  }

  sup {
    margin-top: 10px;
    vertical-align: super;
    font-size: 0.6em;
    line-height: 1ch;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

export default P01;
