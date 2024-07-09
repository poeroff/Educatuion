import styled from '@emotion/styled';
import FileUpload from '@maidt-cntn/assets/icons/fileUpload.svg';
import { EStyleIndex, Image } from '@maidt-cntn/ui';

export namespace StyleFile {
  export const Container = styled.div<{ hasFile?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    ${({ hasFile }) => (hasFile ? '' : `background-color: var(--color-grey-200);`)}
    border-radius: 8px;
    overflow: hidden;
  `;

  export const Input = styled.input`
    display: none;
  `;

  export const InputText = styled.button`
    color: var(--color-grey-700);
    font-size: 26px;
    line-height: 24px;
    font-weight: var(--font-weight-bold);
  `;

  export const FileUploadButton = styled.button`
    background: url(${FileUpload}) center no-repeat;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    margin-bottom: 20px;
  `;

  export const PreviewImage = styled(Image)<{ maxWidth: string; maxHeight: string }>`
    ${({ maxWidth, maxHeight }) => `
      max-width: ${maxWidth};
      max-height: ${maxHeight};
    `}
    object-fit: cover;
  `;
}

export namespace StyleAlert {
  export const ErrorMessage = styled.div`
    margin-top: 10px;
    font-size: 18px;
    line-height: 27px;
    color: var(--color-red-800);
  `;

  export const AlertWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  export const AlertContent = styled.div`
    padding: 0 10px;
  `;

  export const AlertTitle = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
  `;

  export const AlertFooter = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
  `;

  export const AlertCloseButton = styled.button`
    position: absolute;
    top: -36px;
    width: 68px;
    height: 32px;
    right: 0;
    border-radius: 100px;
    outline: none;
    border: none;
    padding: 4px 20px;
    font-family: 'SUIT';
    font-weight: var(--font-weight-bold);
    font-size: 16px;
    line-height: 24px;
    color: #6a6d73;
    box-shadow: 0px 4px 16px 0px #47494d3d;
    z-index: ${EStyleIndex.DIALOG};
    background-color: var(--color-white);
    &:hover,
    &:focus {
      box-shadow: 0px 4px 16px 0px #47949d;
    }
  `;

  export const ButtonText = styled.span<{ isActive?: boolean }>`
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;

    * {
      display: inline-block;
      margin-right: 6px;
    }

    ${({ isActive }) =>
      isActive
        ? `
      * {
        
        filter: invert(100%);
        -webkit-filter: invert(100%);
        filter: brightness(0) invert(1);
      }
    `
        : `
        filter: grayscale(1);
        opacity: 0.4;
    `}
  `;
}
