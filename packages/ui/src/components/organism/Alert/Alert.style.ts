import styled from '@emotion/styled';

export interface IAlertStyle {
  width?: string;
  height?: string;
  src?: string;
}

namespace StyleAlert {
  export const Alert = styled.span<IAlertStyle>``;

  export const Icon = styled.span<IAlertStyle>``;

  export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    white-space: pre-wrap;

    img + * {
      margin-top: 16px;
    }
  `;

  export const Loading = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  export const LoadingMessage = styled.p`
    display: inline-block;
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-bold);
    line-height: 20px;
    text-align: center;
    color: var(--color-grey-900);
    white-space: pre-wrap;
    margin-top: 20px;
  `;

  export const Message = styled.p`
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-bold);
    line-height: 28px;
    text-align: center;
    color: var(--color-grey-800);
    margin-top: 16px;
    white-space: pre-wrap;
  `;

  export const SubMessage = styled.p`
    display: inline-block;
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-bold);
    line-height: 20px;
    text-align: center;
    color: var(--color-grey-900);
    white-space: pre-wrap;
  `;

  export const Description = styled.span`
    display: inline-block;
    font-size: var(--font-size-14);
    line-height: 20px;
    text-align: center;
    color: var(--color-grey-600);
    white-space: pre-wrap;
  `;
}

export default StyleAlert;
