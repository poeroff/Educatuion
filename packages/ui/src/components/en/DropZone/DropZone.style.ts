import styled from '@emotion/styled';

namespace StyleDropZone {
  export const ChipButton = styled.button<{
    backgroundColor?: string;
    isDisabled?: boolean;
    isShadow?: boolean;
    minWidth?: string;
    isError?: boolean;
  }>`
    height: fit-content;
    width: fit-content;
    ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
    padding: 3px 9px;

    border-radius: 50px;
    box-shadow: 0px 2px 16px 0px #65738f1f;

    ${({ backgroundColor }) =>
      backgroundColor ? `background-color: ${backgroundColor}` : ' background-color: var(--color-white); border: 1px solid var(--color-grey-400)'};
    ${({ isDisabled }) => isDisabled && 'background-color: var(--color-grey-100);'}
    ${({ isError }) => isError && 'background-color: var(--color-red-50); border-color: var(--color-red-700); color: var(--color-red-700);'}
    ${({ isShadow = true }) => !isShadow && 'box-shadow : none'}
  `;

  export const DropZone = styled.div`
    display: flex;
    > button {
      align-self: flex-end;
    }

    flex: 1;
    width: 100%;
    max-height: 199px;
    padding: 12px 20px;
    margin-top: 20px;

    background-color: var(--color-grey-100);
    border: 1px dashed var(--color-grey-500);
    border-radius: 12px;
  `;

  export const InformationText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;

    font-size: 18px;
    line-height: 28px;
    color: var(--color-grey-700);

    > span {
      margin-bottom: 8px;
    }
  `;
}

export default StyleDropZone;
