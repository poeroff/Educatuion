import { EStyleIndex } from '../../../styles/types';
import styled from '@emotion/styled';

namespace PinchZoomViewer {
  export const ZoomImageBox = styled.div`
    position: relative;
    width: fit-content;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    > img,
    video {
      width: 100%;
      min-height: calc(100% - 35px);
      object-fit: contain;
    }
  `;

  export const HiddenImageWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: ${EStyleIndex.PinchZoom};
  `;

  export const GnbWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 35px;
    background-color: var(--color-grey-900);
    padding: 8px 80px;

    p,
    button {
      color: var(--color-white);
      font-size: var(--font-size-12);
      font-weight: var(--font-weight-bold);
    }

    p {
      flex: 1;
    }

    button {
      white-space: nowrap;
      background-color: transparent;
    }
  `;

  export const ContentWrap = styled.div<{ imageHeight?: number; imageWidth?: number }>`
    overflow: hidden;
    width: fit-content;
    height: inherit;
    margin: 0 auto;
    background: var(--color-white);
  `;

  export const ZoomControllerWrapper = styled.div`
    position: absolute;
    display: flex;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    border-radius: 6px;
    background-color: var(--color-grey-900);

    button + button::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 14px;
      border-radius: 2px;
      background-color: var(--color-white);
    }
  `;

  export const ZoomControlBtn = styled.button<{ zoomInSvg: string; zoomOutSvg: string }>`
    padding: 4px 12px;
    color: var(--color-white);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-14);
    border-radius: 6px;

    &::after {
      content: '';
      display: inline-block;
      vertical-align: top;
      width: 20px;
      height: 20px;
      margin-left: 7px;
    }

    &:first-of-type::after {
      background: url(${({ zoomInSvg }) => `"${zoomInSvg}"`}) no-repeat center;
    }
    &:nth-of-type(2)::after {
      background: url(${({ zoomOutSvg }) => `"${zoomOutSvg}"`}) no-repeat center;
    }

    :focus {
      outline: 2px solid var(--color-white);
    }
  `;
}

export default PinchZoomViewer;
