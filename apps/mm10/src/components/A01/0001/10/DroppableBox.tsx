import { useState, useEffect } from 'react';
import styled from 'styled-components';
import DragIcon from '@/assets/A01/0001/10/drag.svg';
import { SvgIcon } from '@maidt-cntn/ui';
import { ClickOrDragEvent } from '@/cards/A01/0001/10/P01';

interface DroppableBoxProps {
  id: string;
  chipText: string;
  answers: string[];
  isDropped: boolean;
  onDrop: () => void;
  onClick: () => void;
  onAnswerDragStart: (e: ClickOrDragEvent, num: string, type: string) => void;
}

const DroppableBox = ({ id, chipText, answers, onDrop, onAnswerDragStart, isDropped }: DroppableBoxProps) => {
  const [droppedItems, setDroppedItems] = useState<string[]>(answers);
  useEffect(() => {
    setDroppedItems(answers);
  }, [answers]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <BoxContainer onDragOver={onDragOver} onClick={onDrop} onDrop={onDrop} $isDropped={isDropped}>
      <Chip $isPrime={chipText === '소수'}>{chipText}</Chip>
      {droppedItems.length > 0 ? (
        <AnswerContainer>
          {droppedItems.map(num => (
            <AnswerBox key={num} draggable onDragStart={e => onAnswerDragStart(e, num, id)} onClick={e => onAnswerDragStart(e, num, id)}>
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
  width: 400px;
  height: 186px;
  border-radius: 8px;
  border: ${({ $isDropped }) => ($isDropped ? '1px solid var(--color-grey-500)' : '1px dotted var(--color-grey-500)')};
  background-color: ${({ $isDropped }) => ($isDropped ? 'var(--color-white)' : 'var(--color-grey-50)')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Chip = styled.button<{ $isPrime: boolean }>`
  position: absolute;
  width: ${props => (props.$isPrime ? '64px' : '80px')};
  height: 28px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-700);
  color: var(--color-white);
  line-height: 28px;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-18);
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AnswerContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  flex-wrap: wrap;
`;

const AnswerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 100px;
  height: 52px;
  background-color: var(--color-yellow-100);
  border: 1px solid var(--color-yellow-300);
  color: var(--color-grey-900);
  font-family: 'NOTO';
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
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
