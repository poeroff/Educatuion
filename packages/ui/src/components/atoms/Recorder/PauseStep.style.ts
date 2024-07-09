import styled from '@emotion/styled';

export const PauseStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const ResumeRecordingButton = styled.button`
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

export const StopRecordingButton = styled.button`
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
