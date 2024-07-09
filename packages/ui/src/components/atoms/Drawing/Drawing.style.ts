import styled from '@emotion/styled';

const DrawingModalWrapper = styled.div<{ isPen?: boolean; top: number; left: number; yPosition: number }>`
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};

  display: flex;
  flex-direction: column;

  ${props =>
    !props.isPen &&
    ` padding-bottom:20px; 
      align-items: center;`}

  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0px 4px 16px 0px #47494d3d;

  z-index: 3;

  &::after {
    position: absolute;
    ${props => (props.isPen ? `top:${props.yPosition}px;` : `bottom:${props.yPosition}px;`)}
    right: -16px;
    content: ' ';
    height: 0;
    z-index: -1;
    border-bottom: 16px solid;
    border-left: 12px solid rgba(0, 0, 0, 0);
    border-right: 12px solid rgba(0, 0, 0, 0);
    color: #fff;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
  }
`;

const DrawingControlBox = styled.div<{ isPen?: boolean }>`
  padding: 18px;

  display: grid;
  grid-template-columns: fit-content(100%) 1fr;
  grid-template-rows: repeat(2, fit-content);
  grid-row-gap: 24px;
  grid-column-gap: 20px;
  align-items: center;

  ${props => props.isPen && `border-bottom: 1px solid var(--color-grey-100);`}
`;

const DrawingControlLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 14px;
  font-weight: 700;
  color: var(--color-grey-800);
  text-align: center;
`;

const DrawingControlItemBox = styled.div`
  display: flex;
  gap: 12px;
`;

const PenStroke = styled.button`
  width: 32px;
  height: 32px;

  cursor: pointer;
`;

const PenColorWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const PenColor = styled.button<{ $active: boolean }>`
  width: 32px;
  height: 32px;

  border-radius: 50%;
  border: none;

  cursor: pointer;

  ${props =>
    props.$active &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid var(--color-blue-700);

      & > div {
        width: 15px;
        height: 15px;
      }
`}
`;

const PenColorCircle = styled.div<{ color: string }>`
  width: inherit;
  height: inherit;

  border-radius: 50%;
  background-color: ${props => props.color};
  border: none;
`;

const StraightControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 56px;
  padding: 0 19px;

  line-height: 56px;
`;

const ToggleButton = styled.button<{ isLine: boolean }>`
  position: relative;

  width: 64px;
  height: 32px;

  border-radius: 15.5px;

  ${props =>
    props.isLine
      ? `
    background-color: var(--color-blue-50);
    border:1px solid var(--color-blue-300);

    
    & > div{
      right:3px;
      background-color: #0091ff;
      }
    `
      : `
      background-color: var(--color-grey-100);
      border: 1px solid var(--color-grey-500);
      
      & > div{
        left:3px;
        background-color: var(--color-grey-600);
      }
    `}
`;

const OnOff = styled.div`
  position: absolute;
  top: 3px;

  width: 24px;
  height: 24px;

  border-radius: 50%;
`;

const ClearAllButton = styled.button`
  width: 165px;
  height: 40px;
  padding: 6px 12px;

  border-radius: 8px;
  border: 1px solid var(--color-pink-500);
  background-color: var(--color-white);

  cursor: pointer;

  font-family: var(-font-SUIT);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  line-height: 20px;
  text-align: center;
  color: var(--color-pink-500);

  &:disabled {
    color: var(--color-grey-700);

    border: 1px solid var(--color-grey-600);
    background: var(--color-grey-50);

    cursor: default;
  }
`;

export const AlertContentBox = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, fit-content);
  grid-template-rows: repeat(2, fit-content);
  grid-template-areas: 'content content' 'cancel-btn confirm-btn';
  grid-gap: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  white-space: pre-wrap;

  /* SUIT/16 Bold */
  font-family: SUIT;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  color: var(--color-grey-700);
`;

export const AlertContent = styled.span`
  grid-area: content;

  align-self: flex-end;
`;

export const AlertButton = styled.button<{ isConfirm?: boolean }>`
  grid-area: ${props => (!props.isConfirm ? 'cancel-btn' : 'confirm-btn')};

  width: 120px;
  padding: 10px 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: SUIT;
  text-align: center;
  font-size: 16px;
  font-weight: 700;

  border-radius: 24px;

  ${props =>
    !props.isConfirm
      ? `
      color: var(--color-grey-700);
      border: 1.5px solid var(--color-grey-500);
      background: var(--color-white);
      `
      : `
      color: var(--color-white);
      border: 1.5px solid var(--color-blue-700);
      background: var(--color-blue-700);
      `}
`;

const Style = {
  DrawingModalWrapper,
  DrawingControlBox,
  DrawingControlItemBox,
  DrawingControlLabel,
  PenStroke,
  PenColor,
  PenColorWrapper,
  PenColorCircle,
  StraightControlBox,
  ToggleButton,
  OnOff,
  ClearAllButton,
  AlertContentBox,
  AlertContent,
  AlertButton,
};

export default Style;
