import styled from '@emotion/styled';

namespace StyleAudioPlayer {
  export const AudioPlayerContainer = styled.section<{ top: number; right: number; zIndex: number }>`
    position: absolute;
    top: ${props => `${props.top}px`};
    right: ${props => `${props.right}px`};
    z-index: ${props => props.zIndex};
  `;

  export const AudioPlayerSection = styled.section<{ isDetailView: boolean }>`
    display: flex;
    align-items: center;

    width: ${props => (props.isDetailView ? '397px' : '0px')};
    height: 52px;
    padding: ${props => (props.isDetailView ? '0 0 0 12px' : '0px')};

    border-radius: 50px;
    background-color: #f8f8f8;
    box-shadow: 0px 4px 16px 0px rgba(71, 73, 77, 0.24);

    overflow: hidden;
    audio {
      display: hidden;
    }

    * + * {
      margin-left: 12px;

      p {
        white-space: nowrap;
      }
    }
  `;

  export const PlayingFigure = styled.button`
    border-radius: 100%;
    width: 32px;
    height: 32px;
    padding: 0;

    & > svg > path {
      fill: var(--color-blue-500);
    }
  `;

  export const AudioOpenButton = styled.button<{ size: number; isDetailView: boolean }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    margin: 0px;

    border-radius: 100%;

    ${props =>
      !props.isDetailView
        ? `
          box-shadow: 0px 4px 16px 0px rgba(71, 73, 77, 0.24);
          position: absolute;
          right: 2px;
          z-index: 10;`
        : `
        display:flex;
        align-items:center;
        padding: 4px;
        `}

    > img,
    span {
      ${props =>
        !props.isDetailView &&
        `
      width: 100%;
      height: 100%;
      `}
    }
  `;
  export const TimeViewSection = styled.section`
    width: 150px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4px 20px;
    grid-row-gap: 8px;
    align-items: center;

    * + * {
      margin-right: 12px;
    }
  `;

  export const TimeDisplaySection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0px;
  `;

  export const TimeDisplay = styled.p<{ current?: boolean }>`
    font-family: 'SUIT';
    margin: 0;
    width: 41px;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-14);
    color: #6a6d73;
  `;

  export const ProgressBarContainer = styled.section`
    width: 150px;
    height: 4px;
    position: relative;
    background-color: #e0e2e6;
    border-radius: 10px;
  `;

  export const ProgressBarTrack = styled.div<{ value: number; max: number }>`
    width: ${({ value, max }) => `${(value / max) * 150}px`};
    height: 100%;

    background-color: var(--color-blue-600);
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 0;
    &:focus + * {
      outline: 2px solid #1e78ff;
      outline-offset: 2px;
    }
  `;

  export const ProgressBarHandle = styled.div<{ left: number }>`
    width: 17px;
    height: 17px;
    background-color: white;
    left: ${props => `${props.left}%`};
    border: 2px solid var(--color-blue-600);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 1;
    margin: 0;
  `;

  export const CaptionContainer = styled.div<{ hasCaption: boolean }>`
    ${props => !props.hasCaption && `opacity:0;`}
    position: absolute;
    top: 56px;
    right: 0px;

    display: flex;
    align-items: center;
    width: 397px;
    padding: 2px 10px;
    margin: 0px;

    background-color: var(--color-grey-800);
    border-radius: 5.349px;

    & > span {
      font-family: SUIT;
      font-size: 12px;
      font-weight: var(--font-weight-medium);
      color: var(--color-white);
      line-height: 150%;
    }
  `;
}

export default StyleAudioPlayer;
