import { css } from '@emotion/react';
import styled from '@emotion/styled';

namespace StyleVideoPlayer {
  export const VideoContainer = styled.div<{ width?: number; height?: number; isFullScreen: boolean; isScript: boolean }>`
    width: ${props => (props.isFullScreen ? '100vw' : props.width ? `${props.width}px` : '100%')};
    height: ${props => (props.isFullScreen ? '100vh' : props.height ? `${props.height}px` : '100%')};
    position: ${props => (props.isFullScreen ? 'fixed' : 'relative')};
    ${({ isFullScreen, isScript }) => {
      if (!isFullScreen && isScript) {
        return css`
          border-radius: 8px 0 0 8px;
          video {
            border-radius: 8px 0 0 8px;
          }
        `;
      }
      if (isFullScreen) {
        return css`
          border-radius: 0px;
          video {
            border-radius: 0px;
          }
        `;
      }
      if (!isFullScreen && !isScript) {
        return css`
          border-radius: 8px;
          video {
            border-radius: 8px;
          }
        `;
      }
      return null;
    }}

    top: ${props => props.isFullScreen && 0};
    left: ${props => props.isFullScreen && 0};
    z-index: 10;

    video {
      width: 100%;
      height: 100%;
      object-fit: ${props => (!props.isFullScreen ? 'scale-down' : 'contain')};
      background-color: gray;
      padding-top: ${props => props.isFullScreen && '40px'};
      position: relative;
    }

    display: flex;
    justify-content: center;

    .zoom-svg {
      position: absolute;
      bottom: 10px;
      right: 8px;
    }

    .tooltip-svg {
      position: absolute;
      bottom: 10px;
      right: 52px;
    }
  `;

  export const VideoFileName = styled.div`
    font-family: var(--font-SUIT);
    display: flex;
    align-items: center;
    padding: 0 80px;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    position: absolute;
    z-index: 999;
    font-size: var(--font-size-14);
    background-color: var(--color-grey-900);
    color: var(--color-white);
    font-weight: var(--font-weight-bold);
    line-height: 20px;

    button {
      cursor: pointer;
      border: none;
      background-color: transparent;
      font-size: var(--font-size-14);
      background-color: var(--color-grey-900);
      color: var(--color-white);
      font-weight: var(--font-weight-bold);
      line-height: 20px;
    }
  `;

  export const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `;

  export const ScriptSection = styled.div<{ isFullScreen: boolean }>`
    width: 22%;
    height: 100%;
    padding: ${props => (props.isFullScreen ? '40px 8px 12px 8px' : '12px 8px')};
    border-radius: 0 8px 8px 0;
    background-color: var(--color-grey-800);
    overflow-y: auto;
    overflow-x: hidden;

    p {
      font-family: var(--font-SUIT);
      font-size: var(--font-size-24);
      line-height: 36px;
      font-weight: var(--font-weight-medium);
      color: var(--color-white);
    }

    .current-caption {
      color: var(--color-yellow-200); /* 현재 시간에 해당하는 스크립트의 색상 */
    }
  `;
}

export default StyleVideoPlayer;
