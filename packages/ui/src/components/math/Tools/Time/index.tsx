import React, { useState } from 'react';
import style from './index.style';
import { ToolDrag } from '../ToolDrag';
import { StopWatch } from './StopWatch';
import { ITools } from '../Tools';
import { Timer } from './Timer';

export const Time = ({ setShow, zIndex }: ITools) => {
  const [isStopWatch, setIsStopWatch] = useState(true);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <ToolDrag cancelClassName={CANCEL_BUTTON} zIndex={zIndex} boundaryInfo={{ top: 0, left: 0, bottom: 410, right: 816 }}>
      <style.StopWatchContainer>
        <style.CloseButton className={CANCEL_BUTTON} onClick={closeModal}>
          닫기
        </style.CloseButton>
        <style.TimeModal>
          <style.ToggleContainer className={CANCEL_BUTTON} aria-label='스톱워치 타이머 전환버튼' onClick={() => setIsStopWatch(prev => !prev)}>
            <style.ToggleWrapper className={isStopWatch ? '' : 'timer'} />
            <style.ToggleCircleWrapper className={isStopWatch ? '' : 'timer'} />
            <style.ToggleText>
              <span className={isStopWatch ? 'selected' : ''}>스톱워치</span>
              <span className={isStopWatch ? '' : 'selected'}>타이머</span>
            </style.ToggleText>
          </style.ToggleContainer>
          {isStopWatch ? <StopWatch cancelClassName={CANCEL_BUTTON} /> : <Timer cancelClassName={CANCEL_BUTTON} />}
        </style.TimeModal>
      </style.StopWatchContainer>
    </ToolDrag>
  );
};

const CANCEL_BUTTON = 'cancel-button';
