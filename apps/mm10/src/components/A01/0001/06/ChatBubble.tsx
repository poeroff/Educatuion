import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type Direction = 'top' | 'bottom';

interface Props {
  text: string | ReactNode;
  direction: Direction;
  iconRef: RefObject<HTMLElement>;
  onClickClose?: () => void;
  width?: string;
}

const ChatBubble = ({ text, direction, iconRef, onClickClose, width }: Props) => {
  const [bubbleHeight, setBubbleHeight] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    setBubbleHeight(chatContainerRef.current.getBoundingClientRect().height);
  }, [chatContainerRef]);

  if (!iconRef.current) return null;
  const rect = iconRef.current.getBoundingClientRect();

  return (
    <Container direction={direction} position={rect} ref={chatContainerRef} bubbleHeight={bubbleHeight} width={width}>
      <CloseButton type='button' onClick={onClickClose}>
        닫기
      </CloseButton>
      <Content>{text}</Content>
    </Container>
  );
};

const Container = styled.div<{ direction: Direction; position: DOMRect; bubbleHeight: number; width?: string }>`
  display: flex;
  align-items: center;
  position: fixed;
  top: ${props => `${props.position.bottom}px`};
  left: ${props => `${props.position.right}px`};
  transform: ${props =>
    props.direction === 'top'
      ? `translate(calc(-50% - ${props.position.width / 2}px - 30px), calc(${props.position.height}px + 10px))`
      : `translate(calc(-50% - ${props.position.width / 2}px), calc(-${props.bubbleHeight}px - 30px))`};
  border-radius: 12px;
  z-index: 100;

  width: ${({ width }) => width ?? '260px'};

  background-color: var(--color-grey-800);

  padding: 16px;
  padding-top: 40px;

  ${({ direction }) =>
    direction === 'bottom' &&
    `
    &::after {
      border: 20px solid #47494d;
      border-bottom: 20px solid transparent;
      border-right: 15px solid transparent;
      border-left: 15px solid transparent;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      top: calc(100% - 7px);
    }
  `}

  ${({ direction }) =>
    direction === 'top' &&
    `
    &::before {
      border: 20px solid #47494d;
      border-top: 20px solid transparent;
      border-right: 14px solid transparent;
      border-left: 14px solid transparent;
      position: absolute;
      left: 50%;
      transform: translateX(60%);
      content: '';
      top: -32px;
    }
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 2px;
  background: none;
  border: none;
  padding: 4px 18px;
  cursor: pointer;

  font-family: SUIT;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: var(--color-grey-500);
`;

const Content = styled.div`
  font-family: SUIT;
  font-weight: 500;
  font-size: var(--font-size-24);
  line-height: 36px;
  color: var(--color-white);
  word-break: break-all;
`;

export default ChatBubble;
