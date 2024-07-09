import { useState, useEffect } from 'react';
import styled from 'styled-components';
import DragIcon from '@/assets/A01/0001/08/drag.svg';
import { SvgIcon } from '@maidt-cntn/ui';
import { ClickOrDragEvent } from '@/cards/A01/0001/10/P01';

interface DroppableBoxProps {
  id: string;
  answers: string[];
  isDropped: boolean;
  checkedAnswerList?: boolean[];
  onDrop: () => void;
  onClick: () => void;
  onAnswerDragStart: (event: ClickOrDragEvent, num: string, type: string) => void;
}

const DroppableBox = ({ id, answers, onDrop, onAnswerDragStart, isDropped, checkedAnswerList }: DroppableBoxProps) => {
  const [droppedItems, setDroppedItems] = useState<string[]>(answers);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setDroppedItems(answers);
  }, [answers]);

  return (
    <BoxContainer onDragOver={onDragOver} onClick={onDrop} onDrop={onDrop} $isDropped={isDropped}>
      {droppedItems.length > 0 ? (
        <AnswerContainer>
          {droppedItems.map((num, idx) => (
            <AnswerBox
              key={num}
              draggable
              onDragStart={e => onAnswerDragStart(e, num, id)}
              onClick={e => onAnswerDragStart(e, num, id)}
              $isError={checkedAnswerList ? !(checkedAnswerList as boolean[])[idx] : false}
            >
              {num}
            </AnswerBox>
          ))}
        </AnswerContainer>
      ) : (
        <DragDescriptionWrapper>
          <SvgIcon src={DragIcon} width='32px' height='32px' />
          <DragDescription>이곳에 드래그해 주세요</DragDescription>
        </DragDescriptionWrapper>
      )}
    </BoxContainer>
  );
};

export default DroppableBox;

const BoxContainer = styled.div<{ $isDropped: boolean }>`
  position: relative;
  padding: 20px 16px;
  width: 796px;
  height: 128px;
  border-radius: 8px;
  border: ${({ $isDropped }) => ($isDropped ? '1px solid var(--color-grey-500)' : '1px dotted var(--color-grey-500)')};
  background-color: ${({ $isDropped }) => ($isDropped ? 'var(--color-white)' : 'var(--color-grey-50)')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnswerContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  flex-wrap: wrap;
`;

const AnswerBox = styled.div<{ $isError: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 100px;
  height: 58px;
  background-color: var(--color-yellow-100);
  border: 1px solid var(--color-yellow-300);
  color: var(--color-grey-900);
  font-family: 'NOTO';
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;

  ${({ $isError }) =>
    $isError &&
    `
      background-color: #fff4f3;
      border-radius: 8px;
      border: 2px solid #eb1807;
      color: #c11d00;
      }
    `}
`;

const DragDescriptionWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const DragDescription = styled.span`
  font-family: 'SUIT';
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  color: var(--color-grey-700);
`;
