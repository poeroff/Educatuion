import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { useMemo } from 'react';

function P01() {
  const { getValueInputData, changeInputData, pageSubmitted, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const defaultValue = getValueInputData(0, 'TEXT_LIST-0') as string[];

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
    const value = getValueInputData(0, 'TEXT_LIST-0') as string[];
    return getEmptyValue(value);
  }, [getValueInputData]);

  const Radio_Input = ['5, 13', '12, 21', '16, 25', '28, 63'];

  return (
    <Container
      headerInfo={null}
      questionInfo={{
        text: (
          <Title>
            <span>
              문제
              <span>
                2<GradeCheck mainKey={0} />
              </span>{' '}
            </span>
            다음에서 두 수가 서로소인 것을 모두 찾으시오.
          </Title>
        ),
      }}
      submitDisabled={hasEmptyValue || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='채점하기'
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          {Radio_Input.map((el, index) => {
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
                    handleChangeInputData(0, 'TEXT_LIST-0', e.target.value);
                  }}
                  disabled={pageSubmitted}
                />
                <label htmlFor={`option${newIdx}`} data-number={newIdx}>
                  {el}
                </label>
              </Item>
            );
          })}
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

const ItemContainer = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  gap: 10px;
`;

const Item = styled.li<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;

  height: 48px;

  padding: 0 12px;

  input {
    display: none;
  }

  label {
    cursor: pointer;

    display: flex;
    align-items: center;

    font-family: NOTO;
    font-size: 28px;
    font-weight: 400;
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
    width: 200px;

    label {
        color: #fff;

        &::before {
        border: 1px solid #fff;
        }
    }

`}
`;

export default P01;
