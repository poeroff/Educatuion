import { useState } from 'react';
import styled from 'styled-components';
import DroppableBox from '@/components/A01/0001/10/DroppableBox';
import { Container } from '@maidt-cntn/ui/math';
import { Typography } from '@maidt-cntn/ui';
import GradeCheck from '@/components/gradeCheck';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';

export type ClickOrDragEvent = React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>;

const P01 = () => {
  const [activeNum, setActiveNum] = useState<string | null>(null);
  const [clickedData, setClickedData] = useState<{ num: string | null; fromType: string | undefined }>();

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const onDragStart = (e: ClickOrDragEvent, num: string, idx: number, type?: string) => {
    if (isSubmittedInput(0, `TEXT_LIST-${idx}`) || isDropped(num)) {
      e.preventDefault();
      return;
    }
    setClickedData({ num, fromType: type });
    setActiveNum(num);
  };

  const onDrop = (idx: number) => {
    const num = clickedData?.num;
    const fromType = clickedData?.fromType;

    if (!fromType && num) {
      const newArray = [...(getValueInputData(0, `TEXT_LIST-${idx}`) as string[]), num];
      changeInputData(0, `TEXT_LIST-${idx}`, [...newArray]);
    }

    if (fromType && num) {
      const sourceIdx = [0, 1].find(idx => (getValueInputData(0, `TEXT_LIST-${idx}`) as string[]).includes(num));
      if (idx === sourceIdx) return;

      const sourceArray = [...(getValueInputData(0, `TEXT_LIST-${sourceIdx}`) as string[])];
      const targetArray = [...(getValueInputData(0, `TEXT_LIST-${idx}`) as string[])];

      const newSourceArray = sourceArray.filter(item => item !== num);
      const newTargetArray = [...targetArray, num];

      changeInputData(0, `TEXT_LIST-${sourceIdx}`, newSourceArray);
      changeInputData(0, `TEXT_LIST-${idx}`, newTargetArray);
    }
    setActiveNum(null);
    setClickedData({ num: null, fromType: undefined });
  };

  const onAnswerDragStart = (e: ClickOrDragEvent, num: string, type: string) => {
    if (e.nativeEvent instanceof MouseEvent) {
      const sourceIdx = [0, 1].find(idx => (getValueInputData(0, `TEXT_LIST-${idx}`) as string[]).includes(num));
      const sourceArray = [...(getValueInputData(0, `TEXT_LIST-${sourceIdx}`) as string[])];
      const newSourceArray = sourceArray.filter(item => item !== num);
      changeInputData(0, `TEXT_LIST-${sourceIdx}`, newSourceArray);
    }
    setClickedData({ num, fromType: type });
  };

  const isDropped = (num: string) =>
    (getValueInputData(0, 'TEXT_LIST-0') as string[]).includes(num) || (getValueInputData(0, 'TEXT_LIST-1') as string[]).includes(num);

  const allQuestionAnswered = [0, 1].every(n => (getValueInputData(0, `TEXT_LIST-${n}`) as string[]).length > 0);

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{
        text: (
          <HeaderWrapper>
            <Typography weight='800' fontSize='36px' color='#996500' style={{ padding: '0 14px 0 8px' }}>
              <span style={{ position: 'relative' }}>
                1
                <GradeCheck isGradeAll />
              </span>
            </Typography>
            <Typography weight='600' fontSize='36px' style={{ padding: '0' }}>
              다음에서 소수와 합성수를 찾으시오.
            </Typography>
          </HeaderWrapper>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={gradeSubmitPageData}
      useExtend
      submitDisabled={pageSubmitted || !allQuestionAnswered}
    >
      <PageContainer>
        <NumContainer>
          {QUESTION.map((num, idx) => (
            <NumBox
              key={num}
              draggable
              onDragStart={e => onDragStart(e, num, idx)}
              onClick={e => onDragStart(e, num, idx)}
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
            chipText='소수'
            answers={getValueInputData(0, 'TEXT_LIST-0') as string[]}
            onDrop={() => onDrop(0)}
            onClick={() => onDrop(0)}
            onAnswerDragStart={onAnswerDragStart}
            isDropped={(getValueInputData(0, 'TEXT_LIST-0') as string[]).length > 0}
          />
          <DroppableBox
            id='compositeNum'
            chipText='합성수'
            answers={getValueInputData(0, 'TEXT_LIST-1') as string[]}
            onDrop={() => onDrop(1)}
            onClick={() => onDrop(1)}
            onAnswerDragStart={onAnswerDragStart}
            isDropped={(getValueInputData(0, 'TEXT_LIST-1') as string[]).length > 0}
          />
        </DroppableBoxContainer>
      </PageContainer>
    </Container>
  );
};

export default P01;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;

  figure {
    transform: translate(0px, 15px);
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin-top: 30px;
`;

const NumContainer = styled.div`
  display: flex;
  width: max-content;
  height: fit-content;
  justify-content: center;
  gap: 40px;
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
  font-family: 'NOTO';
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
  box-shadow: ${({ $isActive }) => ($isActive ? 'var(--dp-8)' : 'var(--dp-1)')};
`;

const DroppableBoxContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const QUESTION = ['1', '12', '23', '41', '57', '74'];
