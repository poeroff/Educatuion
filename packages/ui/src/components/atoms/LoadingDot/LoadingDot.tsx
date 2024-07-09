import React from 'react';
import { SpinnerWrapper, DotSpinner } from './LoadingDot.style';

export interface ILoadingDot {
  dotColor1?: string;
  dotColor2?: string;
  dotColor3?: string;
}
const LoadingDot: React.FC<ILoadingDot> = ({ dotColor1, dotColor2, dotColor3 }) => {
  return (
    <SpinnerWrapper aria-label='로딩 이미지'>
      <DotSpinner order={1} dotColor={dotColor1 || 'var(--color-blue-500)'} />
      <DotSpinner order={2} dotColor={dotColor2 || 'var(--color-blue-500)'} />
      <DotSpinner order={3} dotColor={dotColor3 || 'var(--color-blue-500)'} />
    </SpinnerWrapper>
  );
};
export default LoadingDot;
