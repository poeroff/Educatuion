import styled from 'styled-components';
import ActivityWithNumber from './components/activityWithNumber';
import { Container } from '@maidt-cntn/ui/math';
import { Input } from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { useMemo } from 'react';

function P04() {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(4),
    collectDatas: getCorrectData(4),
  });

  const getEmptyValue = (values: string[]) => {
    return values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue([getValueInputData(1, 'TEXT-0') as string]);
  }, [getValueInputData]);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'toolsEmotion' }}
      questionInfo={{ text: <Title>블록 코딩으로 소인수분해 하기</Title> }}
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      useExtend
    >
      <ContentsContainer>
        <ItemContainer>
          <Text>
            <GradeContainer>
              <ActivityWithNumber number={2} />
            </GradeContainer>
            <p>다른 수를 입력하여 소인수분해 해 보자.</p>
          </Text>
          <Input
            width='480px'
            inputSize='large'
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

const Title = styled.h1`
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  figure {
    transform: translateX(-15px);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  padding-top: 38px;

  gap: 20px;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;

  display: flex;
  align-items: center;
  align-self: flex-start;

  gap: 20px;
`;

const GradeContainer = styled.div`
  position: relative;
`;

export default P04;
