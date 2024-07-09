import styled from '@emotion/styled';

export const RecorderPlayerContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PlaybackTime = styled.div`
  width: 40px;
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  line-height: 20px;
  color: #fe5663;
`;

export const ProgressWaves = styled.div`
  position: relative;
  width: 162px;
  height: 32px;
  display: flex;
`;

export const EmptyProgressWaves = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
`;

export const EmptyWave = styled.div<{ $waveValue: number }>`
  width: 2px;
  height: ${({ $waveValue }) => `${$waveValue}px`};
  min-height: 3px;
  max-height: 32px;
  border-radius: 1px;
  background-color: #fcc6cc;
`;

export const PlayedProgressWaves = styled.div<{ $playedProgressWaveWidth: number; $playbackTime: number }>`
  width: ${({ $playedProgressWaveWidth }) => `${$playedProgressWaveWidth}px`};
  height: 32px;
  display: flex;
  gap: 4px;
  align-items: center;
  transition: ${({ $playbackTime }) => ($playbackTime !== 0 ? 'width 0.3s linear' : 'none')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
  z-index: 1000;
  overflow: hidden;
`;

export const PlayedWave = styled.div<{ $waveValue: number }>`
  width: 2px;
  min-width: 2px;
  height: ${({ $waveValue }) => `${$waveValue}px`};
  min-height: 3px;
  max-height: 30px;
  border-radius: 1px;
  background-color: #d44b5b;
`;

export const DurationTime = styled.div`
  width: 40px;
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  line-height: 20px;
  color: #8d9299;
`;

export const TogglePlayButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
`;
