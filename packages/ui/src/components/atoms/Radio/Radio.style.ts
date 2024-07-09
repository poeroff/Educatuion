import styled from '@emotion/styled';

export interface IRadioStyle {
  align?: 'horizontal' | 'vertical';
  gap?: number;
  fontSize?: string;
  width?: number;
  height?: number;
}

namespace StyleRadio {
  export const Wrap = styled.label<IRadioStyle & { isError?: boolean; isChecked?: boolean; readOnly?: boolean }>`
    position: relative;
    ${({ align, gap = 10 }) =>
      align === 'horizontal'
        ? `
			display: inline-flex;
			align-items: center;

      & + * {
        margin-left: ${gap}px;
      }
		`
        : `
			display: flex;
			align-items: center;

      & + * {
        margin-top: ${gap}px;
      }
		`}
    cursor: pointer;
    ${({ readOnly }) => (readOnly === true ? `pointer-events: none;` : `pointer-events: all;`)}
  `;

  export const ContentWrapper = styled.div<{ width?: number; height?: number }>`
    flex-direction: column;
    padding: 8px 8px 2px 8px;
  `;

  export const Radio = styled.input<{ width?: number; height?: number }>`
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    position: absolute;
    z-index: -1;
    min-width: ${({ width }) => width}px;
    min-height: ${({ height }) => height}px;
  `;

  // type default
  export const RadioRound = styled(Radio)<{ isError?: boolean }>`
    min-width: 28px;
    min-height: 28px;

    &:checked + * {
      background: ${'var(--color-white)'};
      border: 2px solid ${({ isError }) => (isError ? '#EB1807' : '#1e78ff')};

      &::after {
        background: ${({ isError }) => (isError ? '#EB1807' : '#1e78ff')};
      }
    }
  `;

  export const Icon = styled.span`
    position: relative;
    display: inline-block;
    min-width: 28px;
    min-height: 28px;
    border-radius: 200px;
    background: ${'var(--color-white)'};
    border: 2px solid ${'var(--color-grey-600)'};
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin-top: -8px;
      margin-left: -8px;
      background: ${'var(--color-white)'};
      border-radius: 200px;
    }

    & + * {
      width: calc(100% - 28px);
    }
  `;

  export const IconTopLeft = styled.span`
    position: relative;
    display: inline-block;
    min-width: 24px;
    min-height: 24px;
    border-radius: 200px;
    background: var(--color-white);
    border: 2px solid var(--color-grey-600);
  `;

  export const Label = styled.span<IRadioStyle>`
    display: inline-block;
    padding: 6px 12px;
    margin-left: 8px;
    ${({ fontSize }) => `font-size: ${fontSize};`}
    color: var(--color-grey-900);
    line-height: 40px;
    white-space: pre-line;
    word-break: break-all;
  `;

  // type box
  export const RadioSquare = styled(Radio)<{ isError?: boolean }>`
    &:checked + * {
      background: #1e78ff;
      border: 1px solid #1e78ff;
      color: #ffffff;

      ${({ isError }) =>
        isError &&
        `
          background: #FFF4F3;
          border: 1px solid #EB1807;
          color: #C11D00;
    
          span {
            border-color: #EB1807;
          }
      `}

      ${({ isError }) =>
        !isError &&
        `
        & > * {
          filter: invert(100%);
          -webkit-filter: invert(100%);
          filter: brightness(0) invert(1);
        }
      `}
    }
  `;
  export const RadioTopLeft = styled(Radio)<{ isError?: boolean }>`
    margin: 8px 4px;
    padding: 4px;
    min-width: 28px;
    min-height: 28px;

    &:checked + * {
      box-shadow: 0px 2px 7px 0px #00000073, inset 0px 0px 0px 2px var(--color-blue-700);
      border-radius: 8px;
      background: var(--color-blue-50);
      span {
        border: 2px solid var(--color-blue-700);
        background: radial-gradient(
          circle at center,
          var(--color-blue-700) 0%,
          var(--color-blue-700) 50%,
          var(--color-white) 55%,
          var(--color-white) 100%
        );
      }
      ${({ isError }) =>
        isError &&
        `
          box-shadow: 0px 2px 7px 0px #00000073, inset 0px 0px 0px 2px var(--color-red-700);
          color: var(--color-red-800);
          background: var(--color-red-50);
          span { 
            border: 2px solid var(--color-red-700);
            background: radial-gradient(
              circle at center,
              var(--color-red-700) 0%,
              var(--color-red-700) 50%,
              var(--color-white) 55%,
              var(--color-white) 100%
            )
          }
        );
        
      `}
    }
  `;
  export const Square = styled.div<{ isBorder?: boolean }>`
    background: #fff;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 4px 12px;
    width: 100%;
    line-height: 38px;

    ${({ isBorder = false }) => isBorder && 'border: 1px solid #D0D3D9;'}
  `;
}

export default StyleRadio;
