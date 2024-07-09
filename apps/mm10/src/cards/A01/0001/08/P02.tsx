import { useState } from 'react';
import styled from 'styled-components';
import DroppableBox from '@/components/A01/0001/08/DroppableBox';
import { Container } from '@maidt-cntn/ui/math';
import { Typography } from '@maidt-cntn/ui';
import GradeCheck from '@/components/gradeCheck';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { ClickOrDragEvent } from '../10/P01';

const P02 = () => {
  const [activeNum, setActiveNum] = useState<string | null>(null);
  const [clickedData, setClickedData] = useState<{ num: string | null; fromType: string | undefined }>();

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted, isDetailCorrect } = useCurrentPageData({
    initData: getDefaultData(2),
    collectDatas: getCorrectData(2),
  });

  const onDragStart = (e: ClickOrDragEvent, num: string, type?: string) => {
    if (isSubmittedInput(0, 'TEXT-LIST-0') || isDropped(num)) {
      e.preventDefault();
      return;
    }
    setClickedData({ num, fromType: type });
    setActiveNum(num);
  };

  const onDrop = () => {
    const num = clickedData?.num;
    const fromType = clickedData?.fromType;

    if (!fromType && num) {
      const newArray = [...(getValueInputData(0, 'TEXT-LIST-0') as string[]), num];
      changeInputData(0, 'TEXT-LIST-0', [...newArray]);
    }

    if (fromType && num) {
      const sourceArray = [...(getValueInputData(0, 'TEXT-LIST-0') as string[])];
      const newSourceArray = sourceArray.filter(item => item !== num);

      changeInputData(0, 'TEXT-LIST-0', newSourceArray);
    }
    setActiveNum(null);
    setClickedData({ num: null, fromType: undefined });
  };

  const onAnswerDragStart = (e: ClickOrDragEvent, num: string, type: string) => {
    if (e.nativeEvent instanceof DragEvent) {
      e.preventDefault();
      return;
    }
    if (e.nativeEvent instanceof MouseEvent) {
      const sourceArray = [...(getValueInputData(0, 'TEXT-LIST-0') as string[])];
      const newSourceArray = sourceArray.filter(item => item !== num);
      changeInputData(0, 'TEXT-LIST-0', newSourceArray);
    }
  };

  const isDropped = (num: string) => (getValueInputData(0, 'TEXT-LIST-0') as string[]).includes(num);

  return (
    <Container
      useExtend
      vAlign='start'
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      questionInfo={{
        text: (
          <HeaderWrapper>
            <Typography weight='800' fontSize='36px' color='#996500' style={{ padding: '0 14px 0 8px' }}>
              <span style={{ position: 'relative' }}>
                2
                <GradeCheck isGradeAll />
              </span>
            </Typography>
            <Typography weight='600' fontSize='36px' style={{ padding: '0' }}>
              다음 자연수 중에서 소수를 모두 찾으시오.
            </Typography>
          </HeaderWrapper>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || (getValueInputData(0, 'TEXT-LIST-0') as string[]).length <= 0}
    >
      <PageContainer>
        <NumContainer>19, 31, 46, 53, 57, 65</NumContainer>
        <NumContainer>
          {QUESTION.map(num => (
            <NumBox
              key={num}
              draggable
              onClick={e => onDragStart(e, num)}
              onDragStart={e => onDragStart(e, num)}
              $isActive={activeNum === num}
              $isDropped={isDropped(num)}
            >
              {num}
            </NumBox>
          ))}
        </NumContainer>
        <DroppableBoxContainer>
          <DroppableBox
            id='prime'
            answers={getValueInputData(0, 'TEXT-LIST-0') as string[]}
            onDrop={() => onDrop()}
            onClick={() => onDrop()}
            onAnswerDragStart={onAnswerDragStart}
            isDropped={(getValueInputData(0, 'TEXT-LIST-0') as string[]).length > 0}
            checkedAnswerList={isDetailCorrect(0, 'TEXT-LIST-0', true) as boolean[]}
          />
        </DroppableBoxContainer>
      </PageContainer>
    </Container>
  );
};

export default P02;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;

  figure {
    transform: translate(0px, 10px);
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 30px;
`;

const NumContainer = styled.div`
  display: flex;
  width: max-content;
  height: fit-content;
  justify-content: center;
  gap: 40px;

  font-family: 'NOTO';
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
`;

const NumBox = styled.div<{ $isActive: boolean; $isDropped: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  width: 100px;
  height: 52px;
  background-color: ${({ $isDropped }) => ($isDropped ? 'var(--color-grey-50)' : 'var(--color-yellow-100)')};
  border: ${({ $isDropped }) => ($isDropped ? '1px solid var(--color-grey-400)' : 'none')};
  color: ${({ $isDropped }) => ($isDropped ? 'var(--color-grey-600)' : 'var(--color-grey-900)')};
  box-shadow: ${({ $isActive }) => ($isActive ? 'var(--dp-8)' : 'var(--dp-1)')};

  font-family: 'NOTO';
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
`;

const DroppableBoxContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const QUESTION = ['19', '31', '46', '53', '57', '65'];
