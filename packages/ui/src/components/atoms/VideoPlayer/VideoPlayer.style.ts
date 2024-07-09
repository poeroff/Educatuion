import styled from '@emotion/styled';

// 1차 기획에 따른 opacity css 계산 함수
const calculateOpacity = (isVisible: boolean, isPlaying: boolean) => {
  if (isPlaying) {
    return isVisible ? 0.9 : 0;
  }
  return 1;
};

// 1차 기획에 따른 pointer-events css 계산 함수
const calculatePointerEvents = (isVisible: boolean, isPlaying: boolean) => {
  if (!isPlaying) return 'visible';

  return isVisible ? 'visible' : 'none';
};

namespace StyleVideoPlayer {
  // ------- VideoProgressBar Style -------
  export const ProgressBarWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 4px;
  `;

  export const RangeInput = styled.input`
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 4px;
    border-radius: 10px;

    &::-webkit-slider-thumb {
      border: solid 0.5px #e6e6e6;
      border-radius: 50%;
      cursor: pointer;
    }
  `;

  // ------- ControlBar Style -------
  export const ControlBarContainer = styled.div<{
    isMiniVer: boolean;
    isVisible: boolean;
    isPlaying: boolean;
    isScript: boolean;
  }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${props => (props.isScript ? 'calc(100% - 18%)' : '100%')};
    height: 54px;
    z-index: 100;
    background: var(--color-grey-800);

    pointer-events: auto;
    padding: 12px 20px;
    box-sizing: border-box;
    border-radius: ${props => (props.isScript ? '0 0 0 8px' : '0 0 8px 8px')};

    span {
      font-size: var(--font-size-14);
      font-weight: var(--font-weight-bold);
      line-height: 20px;
    }

    .startTime {
      color: var(--color-blue-500);
      margin-left: 20px;
      margin-right: 12px;
    }

    .endTime {
      color: var(--color-grey-600);
      margin-left: ${props => (props.isMiniVer ? '16px' : '12px')};
    }

    svg {
      &:active {
        path {
          fill: var(--color-grey-500);
        }
        rect {
          fill: var(--color-grey-500);
        }
      }
      flex-shrink: 0;

      &:hover {
        path {
          fill: #b0b6c0;
        }

        rect {
          fill: #b0b6c0;
        }
      }
    }
  `;

  export const ControlButton = styled.button<{ borderRadius?: string; size?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ size }) => size ?? 'auto'};
    height: ${({ size }) => size ?? 'auto'};
    border: 2px solid transparent;
    border-radius: ${({ borderRadius }) => borderRadius ?? '2px'};
    outline: none;
    :focus {
      border: 2px solid var(--color-black);
    }
  `;

  export const PlayStopIconSection = styled.div`
    display: flex;
    gap: 12px;
    position: relative;
  `;

  export const IconSection = styled.div`
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
  `;

  export const SpeedButton = styled.button`
    width: 55px;
    font-size: 14.7px;
    font-weight: var(--font-weight-bold);
    line-height: 21px;
    text-align: center;
    border: none;
    background-color: transparent;
    color: var(--color-white);
  `;

  export const SpeedWrapper = styled.div`
    position: absolute;
    bottom: 54px;
    right: 180px;

    display: flex;
    flex-direction: column;
    width: 122px;
    padding: 6px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: var(--color-grey-700);

    button {
      display: flex;
      padding: 10px 6px;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      align-self: stretch;
      border: none;
    }

    span {
      color: var(--color-white);
      text-align: center;
      font-family: var(--font-SUIT);
      font-size: var(--font-size-14);
      font-weight: var(--font-weight-regular);
    }
  `;
  export const Option = styled.button<{ isSelected: boolean }>`
    padding-left: ${props => (props.isSelected ? 'none' : '30px !important')};
    background-color: ${props => (props.isSelected ? 'var(--color-grey-900)' : 'transparent')};

    svg {
      margin-right: ${props => (props.isSelected ? '8px' : 'none')};
    }
  `;

  export const VolumeBarWrapper = styled.div`
    position: absolute;
    bottom: 34px;
    left: 64px;
    width: 30px;
    height: 148px;
    border-radius: 12px;
    background: var(--color-grey-800);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 7px 0px #0000001f;
  `;

  export const VolumeBar = styled.input`
    transform: rotate(270deg);
    width: 108px;
    height: 4px;

    &:hover {
      opacity: 1;
    }
  `;

  export const MiniFloatingMenu = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 12px;
    gap: 16px;
    height: 54px;
    border-radius: 12px;
    background-color: var(--color-grey-700);
    box-shadow: var(--dp-2);
    position: absolute;
    z-index: 888;
    right: 8px;
    bottom: 66px;
  `;

  export const MiniVolumeBarWrapper = styled(VolumeBarWrapper)`
    background-color: var(--color-grey-700);
    left: 73px;
    bottom: 0px;
  `;

  export const MiniSpeedWrapper = styled(SpeedWrapper)`
    left: -125px;
    bottom: 0px;
  `;

  // ------- ControlBackground Style -------
  export const ControlBackgroundContainer = styled.div<{ isVisible: boolean; isPlaying: boolean; width?: number }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    opacity: ${({ isVisible, isPlaying }) => calculateOpacity(isVisible, isPlaying)};
    transition: opacity 3s;
    pointer-events: ${({ isVisible, isPlaying }) => calculatePointerEvents(isVisible, isPlaying)};
    display: flex;
    align-items: center;
    gap: 24px;

    > svg {
      width: ${({ width = 0 }) => (width < 461 ? '42px' : '72px')};
      height: ${({ width = 0 }) => (width < 461 ? '42px' : '72px')};
    }
  `;

  export const PlayControl = styled.div<{ width?: number }>`
    width: ${({ width = 0 }) => (width < 461 ? '64px' : '102px')};
    height: ${({ width = 0 }) => (width < 461 ? '64px' : '102px')};
    border-radius: 50%;
    svg {
      width: ${({ width = 0 }) => (width < 461 ? '64px' : '102px')};
      height: ${({ width = 0 }) => (width < 461 ? '64px' : '102px')};

      top: 50%;
      left: 50%;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // ------- Caption Style -------
  export const CaptionContainer = styled.div`
    width: fit-content;
    height: 38px;
    gap: 10px;
    border-radius: 10px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    bottom: 66px;

    span {
      font-family: SUIT;
      font-size: 20px;
      font-weight: var(--font-weight-semiBold);
      text-align: center;
      color: white;
    }
  `;
}

export default StyleVideoPlayer;
