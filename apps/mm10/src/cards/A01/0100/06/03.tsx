import styled from 'styled-components';
import { FooterBtn, Scroll } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData, getSolutionData } from '@/cards/A01/0100/06/pageData';
import GradeCheck from '@/components/gradeCheck';
import Solution from '@/components/solution';

const P03 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, formatData } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <Container>
      <Title>
        <span>
          3<GradeCheck isGradeAll />
        </span>{' '}
        다음 두 수의 최대공약수를 구하시오.
      </Title>

      <Content>
        <Scroll>
          <Item>
            <Text>
              <div>
                (1)&nbsp;
                <GradeCheck mainKey={0} />
              </div>{' '}
              <span>9, 15</span>
            </Text>
            <Input
              value={getValueInputData(0, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXT-0')}
            />
          </Item>
          <Item>
            <Text>
              <div>
                (2)&nbsp;
                <GradeCheck mainKey={1} />
              </div>{' '}
              <span>16, 20</span>
            </Text>
            <Input
              value={getValueInputData(1, 'TEXT-0') as string}
              onChange={e => {
                handleChangeInputData(1, 'TEXT-0', e.target.value);
              }}
              disabled={isSubmittedInput(1, 'TEXT-0')}
            />
          </Item>
          <Solution pageType={getDefaultData(2).pageType} answer={formatData(getCorrectData(2))} solution={getSolutionData(2)} />
        </Scroll>
        <button onClick={() => gradeSubmitPageData()}>
          <FooterBtn />
        </button>
      </Content>
    </Container>
  );
};

export default P03;

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
  display: flex;

  width: 179px;

  div {
    position: relative;
  }

  span {
    font-family: STIX;
  }
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
