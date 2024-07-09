import styled from '@emotion/styled';

export namespace StyleQuestion {
  export const QuestionContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  export const Expression = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    margin: 0 6px;
    border: none;
    border-radius: 8px;
    background-color: #ffffff;
    font-family: 'SUIT';
    font-weight: var(--font-weight-medium);
    font-size: 28px;
    line-height: 40px;
  `;

  export const StyledInput = styled.input`
    text-align: center;
    width: 150px;
    height: 52px;
    padding: 6px 12px;
    border: 1px solid #b0b6c0;
    border-radius: 8px;
    font-family: 'SUIT';
    font-weight: var(--font-weight-medium);
    font-size: 28px;
    line-height: 40px;
  `;

  export const TextWrapper = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    margin: 0 6px;
    border-radius: 8px;
    border: none;
    background-color: #ffffff;
    font-size: 50px;
  `;
}

export default StyleQuestion;
