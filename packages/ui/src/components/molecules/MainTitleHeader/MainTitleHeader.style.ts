import { TSubject } from '@/type/Layout';
import styled from '@emotion/styled';

export type TMainTitleHeaderPattern = 'text' | 'icon' | 'number' | 'textBg';

export interface IStyleMainTitleHeaderProps {
  pattern: TMainTitleHeaderPattern;
  subject?: TSubject;
}

namespace StyleMainTitleHeader {
  export const MainTitleHeaderContainer = styled.div<{ titleColor?: string; useExtend?: boolean }>`
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-bold);
    ${({ titleColor = 'var(--color-blue-900)' }) => `color: ${titleColor};`}
    ${({ useExtend }) =>
      useExtend &&
      `
        margin: 0 -40px;
    `}
  `;

  export const Title = styled.p<IStyleMainTitleHeaderProps>`
    ${({ pattern }) => pattern !== 'text' && 'margin-left : 8px'};

    display: flex;
    align-items: center;

    font-size: var(--font-size-20);
    line-height: 32px;
  `;

  export const NumberCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50px;
    background-color: var(--color-blue-500);
    span {
      color: var(--color-white);
      font-size: var(--font-size-14);
      line-height: 20px;
    }
  `;

  export const MainSubTitle = styled.div`
    position: absolute;
    right: 0;
    font-size: 12px;
  `;
}

export default StyleMainTitleHeader;
