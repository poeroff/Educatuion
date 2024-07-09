import styled from '@emotion/styled';

//import empty_checkbox from '@maidt-cntn/assets/icons/checkBox/empty_checkbox.svg';
import empty_checkbox_disabled from '@maidt-cntn/assets/icons/checkBox/empty_checkbox_disabled.svg';
import selected_enabled_check_box from '@maidt-cntn/assets/icons/checkBox/selected_enabled_check_box.svg';
// import selected_pressed_check_box from '@maidt-cntn/assets/icons/checkBox/selected_pressed_check_box.svg';
import un_selected_enabled_check_box from '@maidt-cntn/assets/icons/checkBox/un_selected_enabled_check_box.svg';
// import un_selected_pressed_check_box from '@maidt-cntn/assets/icons/checkBox/un_selected_pressed_check_box.svg';
import error_check_box from '@maidt-cntn/assets/icons/checkBox/error_check_box.svg';

export interface ICheckboxStyle {
  align?: 'horizontal' | 'vertical';
  gap?: number;
  fontSize?: string;
}

namespace StyleCheckbox {
  export const Wrap = styled.label<ICheckboxStyle>`
    ${({ align, gap = 10 }) =>
      align === 'horizontal'
        ? `
			display: inline-flex;
		
      & + * {
        margin-left: ${gap}px;
      }
			align-items: self-start;
		`
        : `
			display: flex;
			align-items: self-start;
     
      & + * {
        margin-top: ${gap}px;
      }
		`}

    align-items: center;
    cursor: pointer;
  `;

  export const Checkbox = styled.input<{ width?: number; height?: number }>`
    background: none;
    border: 0;
    vertical-align: middle;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    position: absolute;
    width: 1px;
    height: 1px;
    min-width: ${({ width }) => width}px;
    min-height: ${({ height }) => height}px;
    z-index: -1;
    -webkit-appearance: none;
    appearance: none;
  `;

  // type default
  export const CheckboxDefault = styled(Checkbox)<{ isError?: boolean }>`
    min-width: 28px;
    min-height: 28px;

    &:checked + * {
      background: ${({ isError }) => (isError ? `url('${error_check_box}')` : `url('${selected_enabled_check_box}')`)} center no-repeat;
      background-size: contain;
    }
    &:disabled + * {
      background: url('${empty_checkbox_disabled}') center no-repeat;
      background-size: contain;
    }

    &:disabled {
      &:checked + * {
        background: url('${empty_checkbox_disabled}') center no-repeat;
        background-size: contain;
      }
    }
  `;

  export const Icon = styled.span`
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url('${un_selected_enabled_check_box}') center no-repeat;
    background-size: contain;

    & + * {
      width: calc(100% - 28px);
    }
  `;

  export const Label = styled.span<ICheckboxStyle>`
    display: inline-block;
    margin-left: 16px;
    width: calc(100% - 45px);
    ${({ fontSize = '28px' }) => `font-size: ${fontSize};`}
    line-height: 40px;
    white-space: pre-line;
    word-break: break-word;
  `;

  // type box
  export const CheckboxSquare = styled(Checkbox)<{ isError?: boolean }>`
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

  export const Square = styled.div<{ isBorder?: boolean }>`
    background: #fff;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 6px 12px;
    width: 100%;
    line-height: 52px;

    ${({ isBorder = false }) => isBorder && 'border: 1px solid #D0D3D9;'}
  `;
}

export default StyleCheckbox;
