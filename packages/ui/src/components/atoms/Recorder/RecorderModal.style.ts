import { EStyleIndex } from '../../../styles/types';
import styled from '@emotion/styled';

export const RecorderModalContainer = styled.div<{ isConvertedState: boolean }>`
  position: fixed;
  width: ${({ isConvertedState }) => (isConvertedState ? '500px' : '348px')};
  min-height: ${({ isConvertedState }) => (isConvertedState ? '264px' : '148px')};
  height: fit-content;
  border-radius: 16px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: ${EStyleIndex.RECORDER};
`;

export const Modal = styled.div<{ isActiveOrPaused: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: ${({ isActiveOrPaused }) => (isActiveOrPaused ? '28px 4px; ' : '32px 4px;')};
  box-shadow: 0px 4px 16px 0px #47494d3d;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  width: 68px;
  height: 32px;
  right: 0;
  border-radius: 100px;
  outline: none;
  border: none;
  padding: 4px 20px;
  font-family: 'SUIT';
  font-weight: var(--font-weight-bold);
  font-size: 16px;
  line-height: 24px;
  color: #6a6d73;
  box-shadow: 0px 4px 16px 0px #47494d3d;
  z-index: ${EStyleIndex.RECORDER};
  background-color: var(--color-white);
  &:hover,
  &:focus {
    box-shadow: 0px 4px 16px 0px #47949d;
  }
`;
