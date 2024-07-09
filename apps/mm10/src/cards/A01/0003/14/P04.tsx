import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import { initDataType } from '@maidt-cntn/api';
import { useMemo } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';

function P04() {
  const { getValueInputData, changeInputData, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(),
    collectDatas: getCorrectData(),
  });

  const defaultValue = getValueInputData(0, 'TEXT-0') as string;

  const $isChecked = (value: string) => {
    return defaultValue === value;
  };

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue([getValueInputData(0, 'TEXT-0') as string]);
  }, [getValueInputData]);

  const Radio_Input = ['2, 56', '3, 56', '6, 56', '8, 56', '15, 56'];

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              4<GradeCheck mainKey={0} />
            </span>{' '}
            다음에서 두 수의 최소공배수가 가장 큰 것은?
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
          {Radio_Input.map((el, index) => {
            const newIdx = String(index + 1);

            return (
              <Item key={newIdx} $isChecked={$isChecked(newIdx)}>
                <input
                  type='radio'
                  id={`option${newIdx}`}
                  name='option'
                  value={newIdx}
                  onChange={e => {
                    changeInputData(0, 'TEXT-0', e.target.value);
                  }}
                  checked={$isChecked(newIdx)}
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

  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  white-space: pre-wrap;

  span {
    font-family: NOTO;
    font-size: 36px;
    font-weight: 400;
    line-height: 58px;

    sup {
      vertical-align: super;
      font-size: 0.6em;
      line-height: 1ch;
    }
  }

  > span:first-child {
    font-family: SUIT;
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;

    margin-right: 14px;
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

    > sup {
      align-self: flex-start;
      margin-top: 10px;
      vertical-align: super;
      font-size: 0.6em;
      line-height: 1ch;
    }
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

export const getDefaultData = (): initDataType => {
  return {
    pageType: 'GRADE',
    inputData: [
      {
        mainKey: 0,
        inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
      },
    ],
  };
};

export const getCorrectData = () => {
  return [
    {
      mainKey: 0,
      inputDatas: [[{ subKey: 'TEXT-0', value: '5' }]],
    },
  ];
};

export default P04;
