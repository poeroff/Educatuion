import useCurrentPageData from '@/hooks/useCurrentPageData';
import { TextView } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { useMemo } from 'react';

function P05() {
  const { getValueInputData, changeInputData, pageSubmitted, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(5),
    collectDatas: getCorrectData(5),
  });

  const defaultValue = getValueInputData(7, 'TEXT_LIST-0') as string[];

  const $isChecked = (value: string) => {
    if (defaultValue.length === 0) return false;
    return defaultValue.some(ans => ans === value);
  };

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    if (!$isChecked(value)) {
      changeInputData(mainKey, subKey, [...defaultValue, value]);
    } else {
      const newList = defaultValue.filter(answer => answer !== value);
      changeInputData(mainKey, subKey, newList);
    }
  };

  const getEmptyValue = (values: string[]) => {
    return values.length === 0 || values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    const value = getValueInputData(7, 'TEXT_LIST-0') as string[];
    return getEmptyValue(value);
  }, [getValueInputData]);

  const INPUT_DATA = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'];

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              5
              <GradeCheck mainKey={7} />
            </span>{' '}
            <h1>
              다음에서 <span>108</span>의 약수를 모두 찾으시오.
            </h1>
          </Title>
        ),
      }}
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <TopContainer>
            <TextView title='보기'>
              <ViewItem>
                ㄱ.{' '}
                <span>
                  2<span role='math'>3</span>
                </span>
                {'\n'}
                ㄴ.{' '}
                <span>
                  3<span role='math'>2</span>
                </span>
                {'\n'}
                ㄷ.{' '}
                <span>
                  2<span role='math'>2</span>×3<span role='math'>2</span>
                </span>
                {'\n'}
                ㄹ.{' '}
                <span>
                  2×3<span role='math'>2</span>×5
                </span>
                {'\n'}
              </ViewItem>
            </TextView>
          </TopContainer>
          <Items>
            {INPUT_DATA.map((el, index) => {
              const newIdx = String(index + 1);

              return (
                <Item key={newIdx} $isChecked={$isChecked(newIdx)}>
                  <input
                    type='checkbox'
                    id={`option${newIdx}`}
                    name='option'
                    value={newIdx}
                    checked={$isChecked(newIdx)}
                    onChange={e => {
                      handleChangeInputData(7, 'TEXT_LIST-0', e.target.value);
                    }}
                    disabled={pageSubmitted}
                  />
                  <label htmlFor={`option${newIdx}`} data-number={newIdx}>
                    {el}
                  </label>
                </Item>
              );
            })}
          </Items>
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
  align-items: center;

  gap: 14px;

  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  > span {
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;
  }

  > h1 > span {
    font-family: NOTO;
  }

  figure {
    transform: translateX(-15px);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;
`;

const TopContainer = styled.div`
  width: 480px;
`;

const ViewItem = styled.p`
  width: 448px;

  font-weight: 400;
  font-size: 28px;
  line-height: 42px;

  white-space: pre-wrap;
  text-align: left;

  span {
    font-family: var(--font-NOTO);

    > span {
      vertical-align: super;
      font-size: 0.9rem;
    }
  }
`;

const Items = styled.ul`
  display: flex;

  margin-top: 40px;
  gap: 10px;
`;

const Item = styled.li<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;

  width: 192px;
  height: 58px;
  padding: 0 12px;

  input {
    display: none;
  }

  label {
    cursor: pointer;

    display: flex;
    align-items: center;

    font-family: NOTO;
    font-size: 32px;
    line-height: 42px;
    font-weight: 700;
  }

  label::before {
    content: attr(data-number);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 38px;
    height: 38px;

    border: 1px solid var(--color-grey-600);
    border-radius: 22px;

    font-family: SUIT;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;

    margin-right: 16px;
  }

  ${({ $isChecked }) =>
    $isChecked &&
    `
    background-color: #1e6efa;
    border-radius: 8px;
   width: 192px;

    label {
        color: #fff;

        &::before {
        border: 1px solid #fff;
        }
    }

`}
`;

export default P05;
