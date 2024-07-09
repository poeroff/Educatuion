import styled from 'styled-components';
import { FooterBtn, Scroll } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData, getSolutionData } from '@/cards/A01/0100/06/pageData';
import GradeCheck from '@/components/gradeCheck';
import Solution from '@/components/solution';

const P02 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, formatData } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <Container>
      <Title>
        <span>
          2<GradeCheck isGradeAll />
        </span>{' '}
        다음 수의 배수를 가장 작은 수부터 차례대로 3개씩 구하시오.
      </Title>

      <Content>
        <Scroll>
          <Item>
            <Text>
              <div>
                (1)&nbsp;
                <GradeCheck mainKey={0} />
              </div>
              <span>5</span>
            </Text>
            <InputContainer>
              <Input
                value={getValueInputData(0, 'TEXT-0') as string}
                onChange={e => {
                  handleChangeInputData(0, 'TEXT-0', e.target.value);
                }}
                disabled={isSubmittedInput(0, 'TEXT-0')}
              />
              <Comma>,</Comma>
              <Input
                value={getValueInputData(0, 'TEXT-1') as string}
                onChange={e => {
                  handleChangeInputData(0, 'TEXT-1', e.target.value);
                }}
                disabled={isSubmittedInput(0, 'TEXT-1')}
              />
              <Comma>,</Comma>
              <Input
                value={getValueInputData(0, 'TEXT-2') as string}
                onChange={e => {
                  handleChangeInputData(0, 'TEXT-2', e.target.value);
                }}
                disabled={isSubmittedInput(0, 'TEXT-2')}
              />
            </InputContainer>
          </Item>
          <Item>
            <Text>
              <div>
                (2)&nbsp;
                <GradeCheck mainKey={1} />
              </div>{' '}
              <span>12</span>
            </Text>
            <InputContainer>
              <Input
                value={getValueInputData(1, 'TEXT-0') as string}
                onChange={e => {
                  handleChangeInputData(1, 'TEXT-0', e.target.value);
                }}
                disabled={isSubmittedInput(1, 'TEXT-0')}
              />
              <Comma>,</Comma>
              <Input
                value={getValueInputData(1, 'TEXT-1') as string}
                onChange={e => {
                  handleChangeInputData(1, 'TEXT-1', e.target.value);
                }}
                disabled={isSubmittedInput(1, 'TEXT-1')}
              />
              <Comma>,</Comma>
              <Input
                value={getValueInputData(1, 'TEXT-2') as string}
                onChange={e => {
                  handleChangeInputData(1, 'TEXT-2', e.target.value);
                }}
                disabled={isSubmittedInput(1, 'TEXT-2')}
              />
            </InputContainer>
          </Item>
          <Solution pageType={getDefaultData(1).pageType} answer={formatData(getCorrectData(1))} solution={getSolutionData(1)} />
        </Scroll>
      </Content>
      <button onClick={() => gradeSubmitPageData()}>
        <FooterBtn />
      </button>
    </Container>
  );
};

export default P02;

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding-left: 24px;
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 58px;
  color: var(--color-grey-900);

  span {
    position: relative;
    font-weight: 800;
    color: var(--color-yellow-700);
  }
`;

const Content = styled.div`
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 48px;

  padding-left: 57px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Text = styled.span`
  font-family: SUIT;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;

  width: 106px;

  display: flex;

  div {
    position: relative;
  }

  span {
    font-family: STIX;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-500);
  border-radius: 8px;
  background-color: var(--color-white);

  padding: 8px 12px;

  width: 74px;
  height: 74px;

  text-align: center;

  font-family: STIX;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;
`;

const Comma = styled.p`
  font-family: SUIT;
  font-weight: 700;
  font-size: 36px;
  line-height: 58px;

  padding: 12px 6px;
`;
