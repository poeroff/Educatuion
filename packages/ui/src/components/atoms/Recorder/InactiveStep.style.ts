import styled from '@emotion/styled';

export const InactiveStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Instruction = styled.div`
  font-family: 'SUIT';
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  line-height: 24px;
  color: #6a6d73;
`;

export const RecordingButton = styled.button`
  font-family: 'SUIT';
  box-sizing: content-box;
  padding: 10px 21px;
  background-color: #fe5663;
  border: none;
  color: #ffffff;
  line-height: 24px;
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;
