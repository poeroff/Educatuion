import styled from '@emotion/styled';

export const ActiveStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const AudioConsole = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 32px;
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const PauseButton = styled.button`
  width: 120px;
  height: 44px;
  color: #fe5663;
  border: 1.5px solid #fe5663;
  background-color: #ffffff;
  line-height: 24px;
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const StopButton = styled.button`
  width: 120px;
  height: 44px;
  color: #ffff;
  border: 1px solid #fe5663;
  background-color: #fe5663;
  line-height: 24px;
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 58px;
  height: 24px;
  gap: 4px;
`;

export const RedDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f55320;
`;

export const TimeStamp = styled.div`
  font-family: 'SUIT';
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  line-height: 24px;
  color: #47494d;
`;
