import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { EStyleButtonTypes, Input } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';

const P01 = () => {
  const { getValueInputData, changeInputData, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: number | string) => {
    changeInputData(mainKey, subKey, value);
  };

  function areAllValuesEmpty(...values: string[]): boolean {
    return values.some(value => value.trim() === '');
  }

  const isEmpty = areAllValuesEmpty(
    getValueInputData(0, 'TEXT-0') as string,
    getValueInputData(1, 'TEXT-0') as string,
    getValueInputData(2, 'TEXT-0') as string,
  );

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'selfCheckMathEmotion' }}
      submitBtnColor={EStyleButtonTypes.SECONDARY}
      submitLabel='완료하기'
      submitDisabled={isEmpty || pageSubmitted}
      onSubmit={submitPageData}
      useExtend
    >
      <Content>
        <Item>
          <Question>
            <StyledLi>이 단원을 배우면서 흥미로웠던 점을 적어 보자.</StyledLi>
          </Question>
          <Input
            status={'enable'}
            width='100%'
            value={getValueInputData(0, 'TEXT-0') as string}
            onChange={event => handleChangeInputData(0, 'TEXT-0', event?.target.value)}
          />
        </Item>
        <Item>
          <Question>
            <StyledLi>이 단원을 배우면서 새롭게 알게 된 점을 적어 보자.</StyledLi>
          </Question>
          <Input
            status={'enable'}
            width='100%'
            value={getValueInputData(1, 'TEXT-0') as string}
            onChange={event => handleChangeInputData(1, 'TEXT-0', event?.target.value)}
          />
        </Item>
        <Item>
          <Question>
            <StyledLi>이 단원에서 나의 부족한 점을 보완할 수 있도록 학습 계획을 세워보자.</StyledLi>
          </Question>
          <Input
            status={'enable'}
            width='100%'
            value={getValueInputData(2, 'TEXT-0') as string}
            onChange={event => handleChangeInputData(2, 'TEXT-0', event?.target.value)}
          />
        </Item>
      </Content>
    </Container>
  );
};

export default P01;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  align-items: self-end;
  padding: 48px 0px 16px 0px;
`;

const Item = styled.div`
  width: 100%;
  height: 98.67px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Question = styled.ul`
  height: 42px;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  text-align: left;
  color: var(--color-grey-900);
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledLi = styled.li`
  list-style-type: disc;
  margin-left: 42px;
`;
