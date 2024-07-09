import { css } from '@emotion/react';
import styled from '@emotion/styled';
import downArrows from '@maidt-cntn/assets/Dropdown/downArrows.svg';
import downArrowsError from '@maidt-cntn/assets/Dropdown/downArrows_error.svg';
import { EStyleIndex } from '@maidt-cntn/ui';

export interface IDropdownStyle {
  top?: number;
  width?: string;
  marginLeft?: string;
  isOpen?: boolean;
  clicked?: boolean;
  isError?: boolean;
  isInline?: boolean;
}
namespace StyleDropdown {
  export const Button = styled.button<IDropdownStyle>`
    display: flex;
    align-items: center;
    border-bottom: ${({ isError }) => (isError ? '' : '1px solid #8d9299')};
    width: ${({ width }) => width};
    height: 56px;
    padding: 4px 10px;
    outline: none;
    background: transparent;

    &::after {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      background: ${({ isError }) => (isError ? `url("${downArrowsError}") center no-repeat` : `url("${downArrows}") center no-repeat`)};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-3.142rad)' : 'none')};
    }
  `;

  export const Wrap = styled.div<IDropdownStyle>`
    display: ${({ isInline }) => (isInline ? 'inline-block' : 'block')};
    position: relative;
    margin-left: ${({ marginLeft }) => marginLeft};
    border: 2px solid transparent;
    border-radius: 8px;

    :focus-within {
      ${({ isError }) =>
        !isError &&
        css`
          background-color: #f4f8ff;
          border: 2px solid #1e6efa;
          color: var(--color-grey-700);

          > button {
            border-bottom: none;
          }
          p {
            color: var(--color-grey-900) !important;
          }
        `}
    }

    ${({ isError }) => isError && { backgroundColor: '#FFF4F3', border: '2px solid #EB1807' }}
  `;

  export const ButtonText = styled.p`
    width: calc(100% - 24px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 28px;
    line-height: 40px;
  `;

  export const Container = styled.ul<IDropdownStyle>`
    position: absolute;
    top: ${({ top }) => (top ? `-${top}px` : '64px')};

    width: ${({ width }) => width};
    height: auto;
    max-height: 200px;
    padding: 10px 0px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    z-index: ${EStyleIndex.DROPDOWN};
  `;

  export const List = styled.li<IDropdownStyle>`
    width: ${({ width }) => width};
    white-space: normal;
    height: auto;
    max-height: 100px;
    padding: 5px 15px;
    background-color: ${({ clicked }) => (clicked ? '#EFF0F2' : 'transparent')};
    cursor: pointer;

    word-break: break-all;
    font-size: 28px;
    line-height: 40px;

    &:hover {
      background-color: #eff0f2;
    }
  `;
}

export default StyleDropdown;
