import styled from '@emotion/styled';
import { TQuestionTypes } from './Question';
import { TSubject } from '@/type/Layout';

export namespace GlobalStyleComps {
  export const QuestionStyle = styled.span<{ type?: TQuestionTypes; subject?: TSubject }>`
    ${({ type }) => type !== 'text' && 'display: flex; > span:first-of-type { margin-right: 12px; } '};
    ${({ type }) => type === 'dot' && 'align-items : flex-start;'}
  `;

  export const Question = styled(QuestionStyle)`
    padding: 4px 12px;
    font-size: 28px;
    line-height: 40px;

    ${({ subject }) =>
      subject === 'math' &&
      `
      padding: 0;
    `}
  `;

  export const QuestionMedium = styled(QuestionStyle)`
    font-size: 32px;
    line-height: 50px;

    ${({ type }) =>
      type === 'icon' &&
      `
      display: flex;
    
      & > span:first-of-type {
        margin-top: 7px;
        margin-bottom: 7px;
      }
    `}
  `;

  export const QuestionLarge = styled(QuestionStyle)`
    font-size: 36px;
    line-height: 58px;

    ${({ type }) =>
      type === 'icon' &&
      `
      display: flex;
    
      & > span:first-of-type {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    `}
  `;

  export const QuestionNum = styled.span<{ size: 'medium' | 'large' }>`
    font-weight: var(--font-weight-extraBold);
    ${({ size }) =>
      size === 'large'
        ? `
      font-size: 36px;
      line-height: 58px;
    `
        : `
      font-size: 32px;
      line-height: 50px;
    `}
    color: #996500;
    margin-right: 12px;
  `;

  export const QuestionDot = styled.span<{ height?: number }>`
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 12px;
    margin-top: 20px;
    border-radius: 20px;
    background: black;
    vertical-align: top;
  `;
}

export default GlobalStyleComps;
