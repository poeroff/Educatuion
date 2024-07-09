import styled from '@emotion/styled';

namespace StyleRuler {
  export const RulerWrap = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  `;

  export const RulerContainer = styled.div<{ $rotation: number; $transformOrigin: string; $scale: number }>`
    transform: ${({ $rotation, $scale }) => `rotate(${$rotation}deg) scale(${$scale})`};
    transform-origin: ${({ $transformOrigin }) => $transformOrigin};
  `;

  export const ButtonList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  `;

  export const RotateButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0px 4px 16px 0px #47494d3d;

    &:hover,
    &:active {
      width: 32px;
      height: 32px;
    }
  `;

  export const ButtonBoundary = styled.div<{ $zIndex: number }>`
    z-index: ${({ $zIndex }) => $zIndex};
  `;

  export const RotateButtonBoundary = styled(ButtonBoundary)`
    position: absolute;
    bottom: -10px;
    right: -30px;
  `;

  export const Button = styled.button<{ $zIndex: number }>`
    z-index: ${({ $zIndex }) => $zIndex};
    font-family: SUIT;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    border-radius: 6px;
    background-color: #232426;
    color: #ffffff;
    padding: 8px;
  `;

  export const DeleteButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 65px;
    height: 36px;
    border-radius: 6px;
    background-color: #232426;
    color: #ffffff;
    font-family: SUIT;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    text-align: right;
    white-space: nowrap;
  `;

  export const ZoomInputWrap = styled.div<{ $zIndex: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: SUIT;
    font-size: 20px;
    font-weight: 700;
    line-height: 21px;
    z-index: ${({ $zIndex }) => $zIndex};
  `;

  export const NumberInput = styled.input`
    font-family: SUIT;
    font-size: 20px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    background-color: transparent;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  `;
}

export default StyleRuler;
