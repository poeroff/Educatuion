import styled from 'styled-components';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface Props {
  text: string;
  direction: Direction;
  onClickClose?: () => void;
}

const ChatBubble = ({ text, direction, onClickClose }: Props) => {
  return (
    <Container direction={direction}>
      <CloseButton type='button' onClick={onClickClose}>
        닫기
      </CloseButton>
      <Content>{text}</Content>
    </Container>
  );
};

const Container = styled.div<{ direction: Direction }>`
  display: flex;
  align-items: center;
  justify-content: column;
  position: absolute;
  top: calc(100% - 6px);
  left: calc(50% + 24px);
  transform: translateX(-50%);
  border-radius: 12px;
  z-index: 100;

  min-width: 260px;

  background-color: var(--color-grey-800);

  padding: 16px;
  padding-top: 40px;

  /* &::after {
    border: 20px solid #47494d;
    border-bottom: 20px solid transparent;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    top: 85px;
  } */

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
      border-right: 15px solid transparent;
      border-left: 15px solid transparent;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      top: calc(50% - 135px);
    }
  `}

  ${({ direction }) =>
    direction === 'right' &&
    `
    &::after {
      border: 20px solid #47494d;
      border-right: 20px solid transparent;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      left: calc(100% - 7px);
    }
  `}


  ${({ direction }) =>
    direction === 'left' &&
    `
    &::before {
      border: 20px solid #47494d;
      border-left: 20px solid transparent;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      left: calc(-40px + 7px);
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
  font-weight: 400;
  font-size: var(--font-size-24);
  line-height: 36px;
  color: var(--color-white);
  word-break: break-all;
  text-align: start;
`;

export default ChatBubble;
