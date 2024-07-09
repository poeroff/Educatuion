import styled from '@emotion/styled';

export const Circle = styled.div<{ isClick?: boolean; isError?: boolean }>`
  width: 10px;
  height: 10px;

  border-radius: 10px;
  background-color: var(--color-black);

  ${({ isClick }) =>
    isClick &&
    `
    outline: 2px solid var(--color-blue-200);
    background-color: var(--color-blue-1100);
  `}
  ${({ isError }) =>
    isError &&
    `
    background-color: var(--color-red-800);
  `}
`;

export const ConnectLineWrapper = styled.div<{ direction?: 'horizontal' | 'vertical'; itemGap?: string; useFull?: boolean; useItemFull?: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction === 'horizontal' && 'column'};
  width: 100%;
  height: ${({ useFull }) => useFull && '100%'};

  // side
  > div {
    flex-direction: ${({ direction }) => direction !== 'horizontal' && 'column'};
  }
  
  // 요소간 간격
  > div > div + div {
    ${({ direction, itemGap = '24px' }) => (direction === 'horizontal' ? `margin-left: ${itemGap};` : `margin-top: ${itemGap};`)}
  }

  > div > div {
    flex: ${({ useItemFull }) => useItemFull && '1'};
  }
  
  > div:first-of-type > div {
    flex-direction: ${({ direction }) => (direction === 'horizontal' ? `column;` : 'row')}
  }
  
  > div:last-of-type > div {
    flex-direction: ${({ direction }) => (direction === 'horizontal' ? `column-reverse;` : 'row-reverse')}
  }

  > div:first-of-type > div > div {
    ${({ direction }) => (direction === 'horizontal' ? `margin-top: 20px;` : 'margin-left: 20px')}
  }
  
  > div:last-of-type > div > div {
    ${({ direction }) => (direction === 'horizontal' ? `margin-bottom: 20px;` : 'margin-right: 20px')}
  }
}
`;

// SideWrapper > bgColor = 버튼 배경색 일괄 적용
// LineButton > bgColor = 버튼 배경색 단일 적용
export const SideWrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  justify-content: space-between;

  // 버튼색 변경
  > div > button {
    background-color: ${({ bgColor }) => bgColor};
  }
`;

export const ItemContainer = styled.div<{ disabled?: boolean; bgColor?: string }>`
  display: flex;
  cursor: pointer;
  height: fit-content;
  align-items: center;

  ${({ disabled }) => {
    if (disabled) {
      return { cursor: 'default', pointerEvents: 'none' };
    }
  }}

  > button {
    background-color: ${({ bgColor = 'var(--color-white)' }) => bgColor};
  }
`;

export const CanvasSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: -1;
`;

export const Line = styled.line<{ status: 'drawing' | 'complete' | 'error' }>`
  stroke-width: 5;
  stroke: ${({ status }) => (status === 'error' ? 'var(--color-red-700)' : status === 'drawing' ? 'var(--color-blue-700)' : 'var(--color-blue-700)')};
`;

// isError = true 시 틀렸을 때 색상이 나옵니다.
export const LineButton = styled.button<{
  color?: string;
  isClick?: boolean;
  isError?: boolean;
  width?: string;
  height?: string;
}>`
  line-height: 48px;
  padding: 12px;
  border-radius: var(--border-radius);
  ${({ color }) => color && `background: ${color}`};
  ${({ isClick }) =>
    isClick &&
    `
    color: var(--color-blue-700);
  `}
  ${({ isError }) =>
    isError &&
    `
    color: var(--color-red-800);
  `}
    ${({ width = '100%' }) =>
    width &&
    `
    width: ${width};
  `}
    ${({ height = '100%' }) =>
    height &&
    `
    height: ${height};
  `};
`;
