import React, { useMemo } from 'react';
import Style from './LoadingIndicator.style';
import Portal from '../../atoms/Portal/Portal';
import Loading from '../../atoms/Loading/Loading';
import LoadingDot from '../../atoms/LoadingDot/LoadingDot';

export interface ILoadingIndicator {
  isShow?: boolean;
  width?: number;
  height?: number;
  message?: string;
}

export const LoadingIndicator: React.FC<ILoadingIndicator> = ({
  isShow = false,
  width = 417,
  height = 206,
  message = '진행 중이에요. 조금만 기다려주세요.',
}) => {
  const state = useMemo(() => {
    return isShow;
  }, [isShow]);

  return (
    <Portal isShow={state}>
      <Style.Wrap>
        <Style.Container width={width} height={height} onClick={e => e.stopPropagation()}>
          <Loading isShow={state} message={message} children={<LoadingDot />} />
        </Style.Container>
      </Style.Wrap>
    </Portal>
  );
};

export default LoadingIndicator;
