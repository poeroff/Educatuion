import styled from '@emotion/styled';

export const ResultStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ConvertedText = styled.div`
  width: 485px;
  height: 210px;
  text-align: start;
  padding: 14px 12px;
  box-sizing: border-box;
  overflow-y: scroll;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-18);
  line-height: 28px;
  color: #232426;
  margin-bottom: 14px;
  font-family: 'SUIT';
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 24px;
`;

export const RefreshRecordingButton = styled.button`
  width: 120px;
  height: 44px;
  color: #6a6d73;
  border: 1.5px solid #6a6d73;
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

export const SubmitButton = styled.button`
  width: 120px;
  height: 44px;
  color: #ffff;
  background-color: #1e78ff;
  line-height: 24px;
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border: none;
`;

export const LoadingText = styled.div`
  margin-top: 8px;
  font-family: 'SUIT';
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  line-height: 24px;
  color: #6a6d73;
`;

export const Arum2Image = styled.div`
  width: 110px;
  height: 110px;
  background-color: #c0c5cc;
`;
