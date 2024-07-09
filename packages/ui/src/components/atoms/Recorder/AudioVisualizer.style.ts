import styled from '@emotion/styled';

export const AudioVisualizerContainer = styled.div``;

export const AudioWave = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 1px;
  box-sizing: border-box;
`;

export const Wave = styled.div<{ $volume: number }>`
  width: 2px;
  height: ${({ $volume }) => `${$volume}px`};
  min-height: 4px;
  max-height: 20px;
  background-color: #d44b5b;
  transition: all 0.1s ease-in-out;
`;

export const DummyWave = styled.div`
  width: 2px;
  height: 4px;
  background-color: #d44b5b;
`;
