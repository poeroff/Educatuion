import styled from '@emotion/styled';

export type TDirection = 'horizontal' | 'vertical';

export interface IListStyle {}

namespace StyleList {
  export const List = styled.ul`
    display: block;
    width: 100%;
  `;

  export const ListItem = styled.li<{ gap?: number; align?: TDirection }>`
    white-space: pre-line;
    line-height: 40px;

    ${({ align }) =>
      align === 'horizontal'
        ? `
        display: inline-block;
    `
        : `
        display: block;
        width: 100%;
    `}

    & + * {
      ${({ align, gap = 10 }) => (align === 'horizontal' ? `margin-left: ${gap}px;` : `margin-top: ${gap}px;`)}
    }
  `;
}

export default StyleList;
