import { ESvgType, Input, SvgIcon, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import GradeCheck from '@/components/gradeCheck';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import BoardSVG from '@/assets/A01/0003/12/board.svg';
import ArrowSVG from '@/assets/A01/0003/12/arrow.svg';
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
    const values = [
      getValueInputData(0, 'TEXT-0') as string,
      getValueInputData(1, 'TEXT-0') as string,
    ];

    return getEmptyValue(values);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={null}
      questionInfo={{
        text: (
          <Title>
            <Span>
              문제<span>4</span> <GradeCheck mainKey={0} />
            </Span>
            <h1>
              소인수분해를 이용하여 두 수 <span>20</span>과 <span>33</span>의 최소공배수를 구하고, 이로부터 서로소인 두 수의 최소공배수는 어떻게 구할
              수 있는지 말하시오.
            </h1>
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
          <Item>
            <SvgIcon src={BoardSVG} alt='board' size='100%' />
            <CalculationContainer>
              <Calculation>
                20=2<sup>2</sup>
                {'    '}×5{'\n'}33={'     '}3{'      '}×11
              </Calculation>
              <Divider />
              <Text>
                <p>최소공배수</p>
                <SvgIcon src={ArrowSVG} alt='arrow' size='100%' type={ESvgType.IMG} />
                <Input
                  width='98px'
                  inputSize='medium'
                  value={getValueInputData(0, 'TEXT-0') as string}
                  onChange={e => {
                    changeInputData(0, 'TEXT-0', e.target.value);
                  }}
                  disabled={isSubmittedInput(0, 'TEXT-0')}
                />
              </Text>
            </CalculationContainer>
          </Item>
          <Textarea
            width='100%'
            height='140px'
            value={getValueInputData(1, 'TEXT-0') as string}
            onChange={e => {
              changeInputData(1, 'TEXT-0', e.target.value);
            }}
            disabled={isSubmittedInput(1, 'TEXT-0')}
          />
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const Span = styled.span`
  white-space: nowrap;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 14px;

  > h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 54px;

    white-space: pre-wrap;

    > span {
      font-family: NOTO;
      font-weight: 400;
    }
  }

  > h1 > span {
  }

  > span {
    display: flex;
    align-items: center;

    gap: 4px;

    font-weight: 500;
    font-size: 24px;
    line-height: 58px;
    color: var(--color-grey-900);

    width: 70px;
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
  align-items: center;

  gap: 40px;

  margin-top: 20px;
  padding-bottom: 10px;
`;

const Item = styled.div`
  width: 407px;
  height: 246px;

  position: relative;
`;

const CalculationContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  width: 262px;
  height: 167px;

  position: absolute;
  top: 44px;
  left: 75px;
`;
const Calculation = styled.p`
  font-family: NOTO;
  font-size: 28px;
  font-weight: 400;
  line-height: 42px;

  white-space: pre-wrap;

  > sup {
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

  gap: 10px;

  p {
    padding: 0;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
  }

  img {
    width: 21px;
    height: 14px;
  }

  input {
    display: inline-flex;
  }
`;

export default P01;
