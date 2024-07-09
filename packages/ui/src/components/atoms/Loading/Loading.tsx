import React from 'react';
import Style from './Loading.style';

export interface ILoadingProps {
  isShow?: boolean;
  message?: string;
  children?: React.ReactNode;
}

export const Loading: React.FC<ILoadingProps> = ({ isShow, message, children }) => {
  return (
    (isShow && (
      <Style.Wrap>
        <Style.LoadingAni>{children}</Style.LoadingAni>
        {message && <Style.LoadingMessage aria-label={message}>{message}</Style.LoadingMessage>}
      </Style.Wrap>
    )) || <></>
  );
};

export default Loading;
