import styled from '@emotion/styled';
import { Property } from 'csstype';

export interface IBoxStyle extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export type TBoxBg = 'gray' | 'blue' | 'white' | 'lightGray' | 'yellow' | 'green' | 'none' | string;
export type TBoxType = 'paint' | 'dashed' | 'line' | 'hidden';

const BoxBg: { [key: string]: string } = {
  gray: `
    background: #F9F9FA;
    border: 1px solid #B0B6C0;
    padding: 6px 12px;
  `,
  white: `
    background: #FFF;
    border: 1px solid #B0B6C0;
    padding: 20px 16px;
    line-height: 52px;
  `,
  blue: `
    background: #F4F8FF;
    border: 1px solid #B0B6C0;
    padding: 20px 16px;
  `,
  lightGray: `
  background: #EFF0F24D;
  border: 1px solid #E0E2E6;
  padding: 28px;
`,
  yellow: `;
  border:2px solid #FFE199;
  background-color:#FFF0CC;
  padding: 12px 20px;
`,
  green: `
  border:2px solid #98D3AA;
  background-color:#C0E4CB;
  padding: 12px 20px;
  `,
  red: `
  border:2px solid var(--color-red-700, #EB1807);
  background-color:var(--color-red-50, #FFF4F3);
  color: var(--color-red-800, #C11D00);
  padding: 12px 20px;
  `,
};

const BoxBgFun = (bgColor: string) => {
  const background = BoxBg[bgColor];
  if (!background) {
    return `
      background: ${bgColor};
    `;
  }
  return background;
};

namespace StyleBox {
  export const BoxWrap = styled.div<IBoxStyle & { useFull?: boolean; boxGap?: number }>`
    display: flex;
    width: 100%;

    ${({ useFull }) =>
      useFull &&
      `
        height: 100%;
    `};
    ${props => `${props}`};

    > div {
      margin-right: ${({ boxGap = 24 }) => `${boxGap}`}px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  `;

  export const Box = styled.div<{
    useFull?: boolean;
    useRound?: boolean;
    background?: TBoxBg;
    hAlign?: Property.AlignContent;
    vAlign?: Property.AlignContent;
    useShadow?: boolean;
    backgroundImg?: string;
    type?: TBoxType;
  }>`
    ${({ background }) => background && BoxBgFun(background)};
    ${({ type }) => {
      switch (type) {
        case 'dashed':
          return 'border: 4px dashed var(--color-grey-100);';
        case 'line':
          return 'border: 4px solid var(--color-grey-100);';
      }
    }}

    ${({ useRound }) =>
      useRound &&
      `
        border-radius: var(--border-radius);
    `};
    ${({ useFull }) =>
      useFull &&
      `
        width: 100%;
        height: 100%;
    `};

    ${({ hAlign }) =>
      hAlign &&
      `
        display: flex;
        align-items: center;
        justify-content: ${hAlign};
    `};

    ${({ vAlign }) =>
      vAlign &&
      `
          display: flex;
          align-items: ${vAlign};
      `};

    ${({ useShadow }) =>
      useShadow &&
      `
      box-shadow: 0px 4px 16px 0px #65738F12;
      border: 1px solid #EFF0F2;
    `}
    ${({ backgroundImg }) =>
      backgroundImg &&
      `
    background-image: url('${backgroundImg}');
    background-size: cover;
    background-position: center;
  `};

    ${props => `${props}`};
  `;

  export const HiddenBox = styled.div<{ id?: string }>`
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
    transform: scale(0);
  `;
}

export default StyleBox;
