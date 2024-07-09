import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import { Input } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
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
      getValueInputData(3, 'TEXT-0') as string,
      getValueInputData(3, 'TEXT-1') as string,
      getValueInputData(3, 'TEXT-2') as string,
      getValueInputData(4, 'TEXT-0') as string,
    ];

    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      questionInfo={{
        text: (
          <Title>
            <span>
              3<GradeCheck isGradeAll />
            </span>
            <div>
              <h1>
                다음은 소인수분해를 이용하여 <span>48</span>과 <span>84</span>의 최소공배수를 구하는
              </h1>
              <h1>
                과정이다. <TitleInput /> 안에 알맞은 수를 써넣으시오.
              </h1>
            </div>
          </Title>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      useExtend
    >
      <ContentsContainer>
        <CalculationContainer>
          <Calculation>
            <p>
              48=2<sup>4</sup>×3
            </p>
            <p>
              84=2<sup>2</sup>×3×7
            </p>
          </Calculation>
          <Divider />
          <Text>
            <p>
              (최소공배수)<span>=</span>
            </p>
            <Input
              width='60px'
              value={getValueInputData(3, 'TEXT-0') as string}
              onChange={e => {
                changeInputData(3, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(3, 'TEXT-0')}
            />
            <span>×</span>
            <Input
              width='60px'
              value={getValueInputData(3, 'TEXT-1') as string}
              onChange={e => {
                changeInputData(3, 'TEXT-1', e.target.value);
              }}
              disabled={isSubmittedInput(3, 'TEXT-1')}
            />
            <span>×</span>
            <Input
              width='60px'
              value={getValueInputData(3, 'TEXT-2') as string}
              onChange={e => {
                changeInputData(3, 'TEXT-2', e.target.value);
              }}
              disabled={isSubmittedInput(3, 'TEXT-2')}
            />
            <span>=</span>
            <Input
              width='82px'
              value={getValueInputData(4, 'TEXT-0') as string}
              onChange={e => {
                changeInputData(4, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(4, 'TEXT-0')}
            />
          </Text>
        </CalculationContainer>
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
  align-items: flex-start;

  div {
    font-weight: 600;
    font-size: 36px;
    line-height: 54px;

    display: flex;
    flex-direction: column;

    h1 {
      display: flex;
      align-items: center;

      white-space: pre-wrap;

      > span {
        font-family: NOTO;
        font-weight: 400;
      }
    }
  }

  > span:first-child {
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

const TitleInput = styled.span`
  width: 42px;
  height: 42px;

  border: 1px solid var(--color-grey-600);
  border-radius: 8px;

  background-color: #fff;
`;

const CalculationContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;

  width: 500px;
  height: 169px;

  margin-top: 38px;
`;

const Calculation = styled.div`
  font-family: NOTO;
  font-size: 28px;
  font-weight: 400;
  line-height: 42px;

  white-space: pre-wrap;

  display: flex;
  flex-direction: column;

  gap: 19px;

  sup {
    margin-top: 10px;
    vertical-align: super;
    font-size: 0.6em;
    line-height: 1ch;
  }
`;

const Divider = styled.div`
  box-sizing: border-box;

  border-top: 1px solid var(--color-grey-900);
`;

const Text = styled.div`
  display: flex;
  align-items: center;

  align-self: center;
  white-space: nowrap;

  p {
    padding: 0;
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
  }

  span {
    font-family: NOTO;
  }

  input {
    height: 38px;

    padding: 0;

    text-align: center;
  }

  input:focus {
    padding: 0;
  }
`;

export default P03;
