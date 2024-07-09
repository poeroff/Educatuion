import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { Textarea, Typography } from '@maidt-cntn/ui';
import ActivityWithNumber from './components/activityWithNumber';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';

const P05 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(5),
    collectDatas: getCorrectData(5),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  function areAllValuesEmpty(...values: string[]): boolean {
    return values.every(value => value.trim() === '');
  }

  const isEmpty = areAllValuesEmpty(getValueInputData(0, 'TEXTAREA-0') as string);

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'creativeUpEmotion' }}
      questionInfo={{ text: <Title>소수로 암호 체계 만들기</Title> }}
      submitLabel='완료하기'
      onSubmit={submitPageData}
      submitDisabled={isEmpty || pageSubmitted}
    >
      <Content>
        <MainBody>
          <ActivityWithNumber number={3} />
          <ContentsWrapper>
            <Typography style={{ padding: '0px', marginTop: '-2px' }}>
              50보다 큰 소수를 암호 키로 정했을 때의 문제점을 말해 보고, 위의 암호 체계에서 이를 해결 할 수 있는 방법을 찾아서 확인해 보자.
            </Typography>
            <Textarea
              height='242px'
              value={getValueInputData(0, 'TEXTAREA-0') as string}
              onChange={e => {
                handleChangeInputData(0, 'TEXTAREA-0', e.target.value);
              }}
              disabled={isSubmittedInput(0, 'TEXTAREA-0')}
            />
          </ContentsWrapper>
        </MainBody>
      </Content>
    </MContainer>
  );
};

export default P05;

const Content = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const Title = styled.div`
  width: 340px;
  height: 54px;
  font-family: SUIT;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  text-align: left;
  color: var(--color-grey-900);
`;

const MainBody = styled.section`
  display: flex;
  width: 1000px;
  flex-direction: row;
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  text-align: left;
  color: var(--color-grey-900);
  gap: 20px;
`;

const ContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 880px;
  gap: 20px;
`;
